from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import ECHO_HARMONICS_PROMPT

def analyze_echo_harmonics(clause_text: str, language: str) -> Dict[str, Any]:
    """
    Compares the semantic weight and traps of a phrase across English, Hindi, and Hinglish.
    """
    if not clause_text.strip():
        return {
            "harmonics_report": "Please provide a phrase or clause to analyze."
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.5)
        prompt = ECHO_HARMONICS_PROMPT.format(
            clause_text=clause_text,
            language=language
        )
        response = llm.invoke(prompt)
        report = response.content.strip()
        
        return {
            "harmonics_report": report
        }
    except Exception as e:
        return {
            "harmonics_report": f"Harmonics analysis failed: {str(e)}"
        }
