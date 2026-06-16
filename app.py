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

# ---------------------------------------------------------------------------
# Resilient LLM Wrapper Patch to handle Groq rate limits (429) automatically
# ---------------------------------------------------------------------------
import langchain_groq
original_ChatGroq = langchain_groq.ChatGroq

class ResilientChatGroq(original_ChatGroq):
    def invoke(self, *args, **kwargs):
        try:
            return super().invoke(*args, **kwargs)
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "rate_limit" in err_str.lower() or "rate limit" in err_str.lower():
                print(f"Rate limit hit on model '{self.model_name}'! Falling back to 'llama-3.1-8b-instant'...")
                api_key_str = self.groq_api_key.get_secret_value() if hasattr(self.groq_api_key, "get_secret_value") else self.groq_api_key
                fallback_llm = original_ChatGroq(
                    model_name="llama-3.1-8b-instant",
                    groq_api_key=api_key_str,
                    temperature=self.temperature
                )
                return fallback_llm.invoke(*args, **kwargs)
            raise e

langchain_groq.ChatGroq = ResilientChatGroq

from ingestion.pdf_parser import parse_pdf
from ingestion.docx_parser import parse_docx
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
from features.portfolio_manager import extract_and_save_metadata, get_portfolio_dashboard_stats, load_metadata
from features.timeline_predictor import predict_lifecycle
from features.counterparty_simulator import simulate_counterparty_pushback
from features.negotiation_ghostwriter import draft_ghostwrite_response
from features.shadow_battle import conduct_shadow_battle
from features.residue_forensics import analyze_residue
from features.alchemy_exporter import convert_sla_to_code

# ---------------------------------------------------------------------------
# Global State & Services
# ---------------------------------------------------------------------------
embedder = Embedder()

def extract_text_from_file(file_path: str) -> str:
    """Extract text from PDF, DOCX, DOC, or TXT file based on extension."""
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".docx" or ext == ".doc":
        return parse_docx(file_path)
    elif ext == ".pdf":
        return parse_pdf(file_path)
    else:
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception:
            return ""

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
    "extracted_texts": {},
    "qa_chain": QAChain(),
    "brief": "",
    "risks": [],
    "analyzed_risks": {}
}

def restore_session_state():
    upload_dir = os.path.join("data", "uploads")
    faiss_dir = "data/faiss_index"
    
    if os.path.exists(upload_dir):
        for filename in os.listdir(upload_dir):
            file_path = os.path.join(upload_dir, filename)
            if os.path.isfile(file_path):
                namespace = os.path.splitext(filename)[0]
                
                # Check if FAISS index files exist for this namespace
                faiss_file = os.path.join(faiss_dir, f"{namespace}.faiss")
                pkl_file = os.path.join(faiss_dir, f"{namespace}.pkl")
                
                if os.path.exists(faiss_file) and os.path.exists(pkl_file):
                    if namespace not in session_state["namespaces"]:
                        session_state["namespaces"].append(namespace)
                    session_state["uploaded_files"][namespace] = file_path
                    
                    # Extract text and store in cache
                    try:
                        text = extract_text_from_file(file_path)
                        if text:
                            session_state["extracted_texts"][namespace] = text
                    except Exception as e:
                        print(f"Failed to restore text for {namespace}: {e}")

# Run restoration immediately on startup
restore_session_state()

def _lang_code(lang_display: str) -> str:
    if lang_display == "Hindi":
        return "Hindi"
    elif lang_display == "Hinglish":
        return "Hinglish"
    else:
        return "English"

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

class CounterpartySimRequest(BaseModel):
    clause_text: str
    proposed_edit: str
    language: str = "English"

class TimelineRequest(BaseModel):
    namespace: str
    language: str = "English"

class GhostwriterRequest(BaseModel):
    clause_text: str
    redlined_text: str
    language: str = "English"

class ShadowRequest(BaseModel):
    namespace: str
    language: str = "English"

class ResidueRequest(BaseModel):
    namespace: str
    language: str = "English"

class AlchemyRequest(BaseModel):
    namespace: str
    language: str = "English"

# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/api/documents")
def get_documents():
    docs = []
    for ns in session_state["namespaces"]:
        file_path = session_state["uploaded_files"].get(ns, "")
        filename = os.path.basename(file_path) if file_path else f"{ns}.pdf"
        docs.append({
            "name": filename,
            "status": "success",
            "namespace": ns,
            "message": "Indexed successfully"
        })
    return {"documents": docs}

@app.post("/api/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")
    
    results = []
    upload_dir = os.path.join("data", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    for file in files:
        try:
            # Save to project persistent upload folder
            temp_path = os.path.join(upload_dir, file.filename)
            with open(temp_path, "wb") as f:
                f.write(await file.read())
                
            namespace = os.path.splitext(file.filename)[0]
            
            # Parse & Index
            text = extract_text_from_file(temp_path)
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
            session_state["extracted_texts"][namespace] = text
            session_state["analyzed_risks"].pop(namespace, None)
            
            # Extract and cache portfolio metadata for dashboard analytics
            try:
                extract_and_save_metadata(namespace, text)
            except Exception as metadata_err:
                print(f"Failed to automatically extract portfolio metadata: {metadata_err}")
            
            results.append({"file": file.filename, "status": "success", "namespace": namespace})
            
        except Exception as e:
            results.append({"file": file.filename, "status": "error", "message": str(e)})

    return {"results": results, "total_indexed": len(session_state["namespaces"])}

@app.delete("/api/documents/{namespace}")
def delete_document(namespace: str):
    if namespace not in session_state["namespaces"]:
        raise HTTPException(status_code=404, detail="Document not found.")
        
    try:
        session_state["namespaces"].remove(namespace)
        
        # Remove uploaded file
        file_path = session_state["uploaded_files"].pop(namespace, None)
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Error deleting temp file for {namespace}: {e}")
                
        # Remove from caches
        session_state["extracted_texts"].pop(namespace, None)
        session_state["analyzed_risks"].pop(namespace, None)
        
        # Re-initialize main risks list by removing any risk items belonging to the deleted namespace
        if "risks" in session_state:
            session_state["risks"] = [r for r in session_state["risks"] if r.get("document") != namespace]
            
        # Clean up FAISS store files
        store = FAISSStore(namespace)
        store.delete_index()
        
        # Remove from portfolio metadata JSON cache
        try:
            from features.portfolio_manager import remove_contract_metadata
            remove_contract_metadata(namespace)
        except Exception as e:
            print(f"Error removing contract metadata from portfolio cache: {e}")
            
        return {"status": "success", "remaining_documents": session_state["namespaces"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
    
    # Initialize cache fields if not present
    if "analyzed_risks" not in session_state:
        session_state["analyzed_risks"] = {}
        
    for ns in session_state["namespaces"]:
        try:
            # Check namespace cache
            if ns in session_state["analyzed_risks"]:
                cached_risks, cached_wolfram = session_state["analyzed_risks"][ns]
                all_risks.extend(cached_risks)
                wolfram_context.extend(cached_wolfram)
                continue
                
            # If not cached, analyze it
            text = session_state.get("extracted_texts", {}).get(ns)
            if not text:
                file_path = session_state["uploaded_files"].get(ns, "")
                if not file_path or not os.path.exists(file_path):
                    continue
                text = extract_text_from_file(file_path)
                if not text: continue
                session_state["extracted_texts"][ns] = text
            
            clauses = extract_clauses(text)
            risks = score_risk(clauses)
            
            ns_risks = []
            ns_wolfram = []
            
            for risk_item in risks:
                risk_item["document"] = ns
                ns_risks.append(risk_item)
                
                if risk_item["risk_level"] == "High":
                    wolfram_result = get_legal_context(risk_item["clause_name"], risk_item["risk_level"])
                    if wolfram_result:
                        ns_wolfram.append({
                            "clause": risk_item['clause_name'],
                            "document": ns,
                            "context": wolfram_result
                        })
            
            # Save to cache
            session_state["analyzed_risks"][ns] = (ns_risks, ns_wolfram)
            
            all_risks.extend(ns_risks)
            wolfram_context.extend(ns_wolfram)
            
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
            
        text_v1 = extract_text_from_file(t1)
        text_v2 = extract_text_from_file(t2)
        
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

@app.post("/api/features/predict-timeline")
def predict_timeline(req: TimelineRequest):
    if req.namespace not in session_state["uploaded_files"]:
        raise HTTPException(status_code=400, detail="Document not found or not indexed yet.")
    temp_path = session_state["uploaded_files"][req.namespace]
    text = extract_text_from_file(temp_path)
    if not text:
        raise HTTPException(status_code=400, detail="Could not read document text.")
    res = predict_lifecycle(text, req.language)
    return res

@app.post("/api/features/counterparty-sim")
def counterparty_sim(req: CounterpartySimRequest):
    res = simulate_counterparty_pushback(
        clause_text=req.clause_text,
        proposed_edit=req.proposed_edit,
        language=req.language
    )
    return res

@app.post("/api/features/ghostwrite")
def ghostwrite(req: GhostwriterRequest):
    res = draft_ghostwrite_response(
        clause_text=req.clause_text,
        redlined_text=req.redlined_text,
        language=req.language
    )
    return res

@app.post("/api/features/shadow")
def shadow_battle(req: ShadowRequest):
    if req.namespace not in session_state["uploaded_files"]:
        raise HTTPException(status_code=400, detail="Document not found or not indexed yet.")
    temp_path = session_state["uploaded_files"][req.namespace]
    text = extract_text_from_file(temp_path)
    if not text:
        raise HTTPException(status_code=400, detail="Could not read document text.")
    res = conduct_shadow_battle(text, req.language)
    return res

@app.post("/api/features/residue")
def residue_forensics(req: ResidueRequest):
    if req.namespace not in session_state["uploaded_files"]:
        raise HTTPException(status_code=400, detail="Document not found or not indexed yet.")
    temp_path = session_state["uploaded_files"][req.namespace]
    text = extract_text_from_file(temp_path)
    if not text:
        raise HTTPException(status_code=400, detail="Could not read document text.")
    res = analyze_residue(temp_path, text, req.language)
    return res

@app.post("/api/features/alchemy")
def alchemy_exporter(req: AlchemyRequest):
    if req.namespace not in session_state["uploaded_files"]:
        raise HTTPException(status_code=400, detail="Document not found or not indexed yet.")
    temp_path = session_state["uploaded_files"][req.namespace]
    text = extract_text_from_file(temp_path)
    if not text:
        raise HTTPException(status_code=400, detail="Could not read document text.")
    res = convert_sla_to_code(text, req.language)
    return res

@app.get("/api/portfolio/dashboard")
def portfolio_dashboard():
    stats = get_portfolio_dashboard_stats(active_namespaces=session_state["namespaces"])
    return stats

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    # Disable reload in production to optimize performance
    reload_mode = os.environ.get("RENDER") is None
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=reload_mode)
