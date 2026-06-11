"""
app.py - Main FastAPI backend for LexiVault.

Provides REST endpoints for document upload, indexing, Q&A,
risk analysis, advanced features, and exports.
"""

import os
import tempfile
import uuid
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ingestion.pdf_parser import parse_pdf
from ingestion.chunker import chunk_text
from embeddings.embedder import Embedder
from vectorstore.faiss_store import FAISSStore
from retrieval.retriever import Retriever
from llm.qa_chain import QAChain
from features.clause_extractor import extract_clauses
from features.risk_scorer import score_risk
from features.plain_language import explain_clause
from features.decision_brief import generate_brief
from features.redline_autopilot import redline_compare
from features.contradiction_detector import detect_contradictions
from wolfram.legal_context import get_legal_context
from export.exporter import export_pdf, export_docx
from features.negotiation_sandbox import simulate_negotiation
from features.semantic_diff import compute_semantic_diff

# ---------------------------------------------------------------------------
# Global State & Services
# ---------------------------------------------------------------------------
embedder = Embedder()
app = FastAPI(title="LexiVault API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session state (for demonstration purposes, better to use Redis/DB in prod)
session_state = {
    "namespaces": [],
    "uploaded_files": {},
    "qa_chain": QAChain(),
    "brief": "",
    "risks": []
}

def _lang_code(lang_display: str) -> str:
    return "hindi" if lang_display == "Hindi" else "english"

# ---------------------------------------------------------------------------
# API Models
# ---------------------------------------------------------------------------

class AskRequest(BaseModel):
    query: str

class PlainLanguageRequest(BaseModel):
    clause_text: str
    language: str = "English"

class BriefRequest(BaseModel):
    language: str = "English"

class ContradictionRequest(BaseModel):
    language: str = "English"

class ExportRequest(BaseModel):
    pass # Uses state

class NegotiationRequest(BaseModel):
    clause_text: str
    clause_type: str = "Limitation of Liability"
    buyer_stance: str = "Conservative"
    seller_stance: str = "Aggressive"
    language: str = "English"

class SemanticDiffRequest(BaseModel):
    text_v1: str
    text_v2: str
    language: str = "English"

# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.post("/api/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")
    
    results = []
    
    for file in files:
        try:
            # Save to temp file
            temp_path = os.path.join(tempfile.gettempdir(), f"{uuid.uuid4()}_{file.filename}")
            with open(temp_path, "wb") as f:
                f.write(await file.read())
                
            namespace = os.path.splitext(file.filename)[0]
            
            # Parse & Index
            text = parse_pdf(temp_path)
            if not text:
                results.append({"file": file.filename, "status": "error", "message": "Failed to extract text."})
                continue
                
            chunks = chunk_text(text)
            if not chunks:
                results.append({"file": file.filename, "status": "error", "message": "No chunks generated."})
                continue
                
            vectors = embedder.embed_chunks(chunks)
            store = FAISSStore(namespace)
            store.build_index(chunks, vectors)
            
            # Update state
            if namespace not in session_state["namespaces"]:
                session_state["namespaces"].append(namespace)
            session_state["uploaded_files"][namespace] = temp_path
            
            results.append({"file": file.filename, "status": "success", "namespace": namespace})
            
        except Exception as e:
            results.append({"file": file.filename, "status": "error", "message": str(e)})

    return {"results": results, "total_indexed": len(session_state["namespaces"])}

@app.post("/api/ask")
def ask_lexivault(req: AskRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    if not session_state["namespaces"]:
        raise HTTPException(status_code=400, detail="No documents indexed yet.")
        
    try:
        retriever = Retriever(session_state["namespaces"])
        chunks = retriever.retrieve(req.query)
        answer = session_state["qa_chain"].answer(req.query, chunks)
        sources = [chunk for chunk in chunks]
        return {"answer": answer, "sources": sources}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/clear-chat")
def clear_chat():
    session_state["qa_chain"] = QAChain()
    return {"status": "cleared"}

@app.get("/api/risks")
def analyze_risks():
    if not session_state["namespaces"]:
        raise HTTPException(status_code=400, detail="No documents indexed.")
        
    all_risks = []
    wolfram_context = []
    
    for ns in session_state["namespaces"]:
        try:
            file_path = session_state["uploaded_files"].get(ns, "")
            if not file_path or not os.path.exists(file_path):
                continue
                
            text = parse_pdf(file_path)
            if not text: continue
            
            clauses = extract_clauses(text)
            risks = score_risk(clauses)
            
            for risk_item in risks:
                risk_item["document"] = ns
                all_risks.append(risk_item)
                
                if risk_item["risk_level"] == "High":
                    wolfram_result = get_legal_context(risk_item["clause_name"], risk_item["risk_level"])
                    if wolfram_result:
                        wolfram_context.append({
                            "clause": risk_item['clause_name'],
                            "document": ns,
                            "context": wolfram_result
                        })
        except Exception as e:
            print(f"Error in analyze_risks for {ns}: {e}")
            all_risks.append({"clause_name": "Error", "risk_level": "High", "value": f"Analysis failed: {str(e)}", "document": ns})
            
    session_state["risks"] = all_risks
    return {"risks": all_risks, "wolfram_context": wolfram_context}

@app.post("/api/features/plain-language")
def plain_language(req: PlainLanguageRequest):
    if not req.clause_text.strip():
        raise HTTPException(status_code=400, detail="Clause text required.")
    explanation = explain_clause(req.clause_text, _lang_code(req.language))
    return {"explanation": explanation}

@app.post("/api/features/decision-brief")
def decision_brief(req: BriefRequest):
    if not session_state["namespaces"]:
        raise HTTPException(status_code=400, detail="No documents indexed.")
    try:
        retriever = Retriever(session_state["namespaces"])
        chunks = retriever.retrieve("summarize all key terms risks obligations and clauses", k=15)
        brief = generate_brief(chunks, _lang_code(req.language))
        session_state["brief"] = brief
        return {"brief": brief}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/features/redline")
async def redline_compare_api(language: str = Form("English"), file_v1: UploadFile = File(...), file_v2: UploadFile = File(...)):
    try:
        t1 = os.path.join(tempfile.gettempdir(), file_v1.filename)
        t2 = os.path.join(tempfile.gettempdir(), file_v2.filename)
        with open(t1, "wb") as f1, open(t2, "wb") as f2:
            f1.write(await file_v1.read())
            f2.write(await file_v2.read())
            
        text_v1 = parse_pdf(t1)
        text_v2 = parse_pdf(t2)
        
        result = redline_compare(text_v1, text_v2, _lang_code(language))
        return {"redline": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/features/contradictions")
def contradictions(req: ContradictionRequest):
    if len(session_state["namespaces"]) < 2:
        raise HTTPException(status_code=400, detail="At least 2 documents needed.")
    try:
        retriever = Retriever(session_state["namespaces"])
        chunks = retriever.retrieve("find all terms obligations clauses penalties", k=20)
        result = detect_contradictions(chunks, _lang_code(req.language))
        return {"contradictions": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/features/negotiate")
def negotiate_clause(req: NegotiationRequest):
    res = simulate_negotiation(
        clause_text=req.clause_text,
        clause_type=req.clause_type,
        buyer_stance=req.buyer_stance,
        seller_stance=req.seller_stance,
        language=req.language
    )
    return res

@app.post("/api/features/semantic-diff")
def semantic_diff(req: SemanticDiffRequest):
    res = compute_semantic_diff(
        text_v1=req.text_v1,
        text_v2=req.text_v2,
        language=req.language
    )
    return res

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
