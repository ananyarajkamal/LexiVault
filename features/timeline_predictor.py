import re
import json
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import LIFECYCLE_TIMELINE_PROMPT

def predict_lifecycle(contract_text: str, language: str) -> Dict[str, Any]:
    """Predicts a contract's estimated negotiation duration, renewal risks, and cascade gap effects."""
    if not contract_text.strip():
        return {
            "negotiation_duration_days": 0,
            "amendment_frequency": "Low",
            "renewal_risk_score": 0,
            "cascade_effects": "No text provided to analyze."
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.1)
        sample_text = contract_text[:10000]
        prompt = LIFECYCLE_TIMELINE_PROMPT.format(contract_text=sample_text, language=language)
        
        response = llm.invoke(prompt)
        raw_content = response.content.strip()
        
        # Clean markdown code blocks from JSON output
        if raw_content.startswith("```"):
            raw_content = re.sub(r"^```json\s*|^```\s*", "", raw_content)
            raw_content = re.sub(r"\s*```$", "", raw_content)
            
        data = json.loads(raw_content)
        
        return {
            "negotiation_duration_days": int(data.get("negotiation_duration_days") or 14),
            "amendment_frequency": data.get("amendment_frequency") or "Medium",
            "renewal_risk_score": int(data.get("renewal_risk_score") or 30),
            "cascade_effects": data.get("cascade_effects") or "No cascade effects detected."
        }
        
    except Exception as e:
        print(f"Lifecycle prediction failed: {e}")
        return {
            "negotiation_duration_days": 14,
            "amendment_frequency": "Medium",
            "renewal_risk_score": 25,
            "cascade_effects": f"Prediction failed: {str(e)}"
        }
