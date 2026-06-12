import os
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import RESIDUE_FORENSICS_PROMPT

def analyze_residue(file_path: str, contract_text: str, language: str) -> Dict[str, Any]:
    """
    Extracts file metadata and performs text heuristics for hidden alterations.
    """
    metadata = {
        "author": "Unknown",
        "creator": "Unknown",
        "producer": "Unknown",
        "creation_date": "Unknown",
        "mod_date": "Unknown",
        "page_count": 0,
        "file_size_bytes": 0
    }

    if file_path and os.path.exists(file_path):
        metadata["file_size_bytes"] = os.path.getsize(file_path)
        try:
            import fitz  # PyMuPDF
            doc = fitz.open(file_path)
            metadata["page_count"] = len(doc)
            meta = doc.metadata
            if meta:
                metadata["author"] = meta.get("author") or meta.get("Author") or "Unknown"
                metadata["creator"] = meta.get("creator") or meta.get("Creator") or "Unknown"
                metadata["producer"] = meta.get("producer") or meta.get("Producer") or "Unknown"
                metadata["creation_date"] = meta.get("creationDate") or meta.get("CreationDate") or "Unknown"
                metadata["mod_date"] = meta.get("modDate") or meta.get("ModDate") or "Unknown"
            doc.close()
        except Exception as e:
            print(f"PyMuPDF failed to extract metadata: {e}")

    if not contract_text.strip():
        return {
            "metadata": metadata,
            "forensics_report": "No text provided for analysis."
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.5)
        prompt = RESIDUE_FORENSICS_PROMPT.format(
            contract_text=contract_text[:12000],
            language=language
        )
        response = llm.invoke(prompt)
        report = response.content.strip()
        
        return {
            "metadata": metadata,
            "forensics_report": report
        }
    except Exception as e:
        return {
            "metadata": metadata,
            "forensics_report": f"Forensics check failed: {str(e)}"
        }
