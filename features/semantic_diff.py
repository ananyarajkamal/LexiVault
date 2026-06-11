import numpy as np
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from embeddings.embedder import Embedder
from llm.prompts import SEMANTIC_DIFF_PROMPT

def compute_semantic_diff(text_v1: str, text_v2: str, language: str) -> Dict[str, Any]:
    """Computes local cosine similarity and prompts the LLM to audit legal differences."""
    if not text_v1.strip() or not text_v2.strip():
        return {
            "similarity_score": 0,
            "explanation": "Please provide both text inputs to compute semantic differences."
        }

    try:
        # Step 1: Compute local vector embeddings & cosine similarity
        embedder = Embedder()
        emb_1 = embedder.embed_query(text_v1)
        emb_2 = embedder.embed_query(text_v2)
        
        norm_1 = np.linalg.norm(emb_1)
        if norm_1 == 0:
            norm_1 = 1e-9
        norm_2 = np.linalg.norm(emb_2)
        if norm_2 == 0:
            norm_2 = 1e-9
            
        similarity = np.dot(emb_1, emb_2) / (norm_1 * norm_2)
        
        # Map similarity to a percentage between 0 and 100
        similarity_percentage = int(max(0.0, float(similarity)) * 100)
        
        # Step 2: Query the LLM to get a professional audit of the legal changes
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.1)
        prompt = SEMANTIC_DIFF_PROMPT.format(
            version_1=text_v1,
            version_2=text_v2,
            language=language
        )
        response = llm.invoke(prompt)
        explanation = response.content.strip()
        
        return {
            "similarity_score": similarity_percentage,
            "explanation": explanation
        }
        
    except Exception as e:
        return {
            "similarity_score": 0,
            "explanation": f"Failed to compute semantic diff: {str(e)}"
        }
