import re
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import NEGOTIATION_GHOSTWRITER_PROMPT

def draft_ghostwrite_response(clause_text: str, redlined_text: str, language: str) -> Dict[str, Any]:
    """
    Drafts diplomatic, legally sound responses for incoming counterparty redlines.
    Produces Accept with Modification and Reject with Rationale options.
    """
    if not clause_text.strip() or not redlined_text.strip():
        return {
            "accept_with_modification": "Please provide both the original clause and the counterparty's redlined edit.",
            "reject_with_rationale": ""
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.7)
        prompt = NEGOTIATION_GHOSTWRITER_PROMPT.format(
            clause_text=clause_text,
            redlined_text=redlined_text,
            language=language
        )
        response = llm.invoke(prompt)
        output = response.content.strip()
        
        accept_mod = ""
        reject_rat = ""
        
        # Parse output into accept with modification and reject with rationale segments
        accept_match = re.search(r"\*?\*?ACCEPT_WITH_MODIFICATION\*?\*?:\s*(.*?)(?=\n\s*\*?\*?REJECT_WITH_RATIONALE\*?\*?:|$)", output, re.DOTALL | re.IGNORECASE)
        reject_match = re.search(r"\*?\*?REJECT_WITH_RATIONALE\*?\*?:\s*(.*)", output, re.DOTALL | re.IGNORECASE)
        
        if accept_match:
            accept_mod = accept_match.group(1).strip()
        else:
            accept_mod = output
            
        if reject_match:
            reject_rat = reject_match.group(1).strip()
            
        return {
            "accept_with_modification": accept_mod,
            "reject_with_rationale": reject_rat
        }
        
    except Exception as e:
        return {
            "accept_with_modification": f"Ghostwriting failed: {str(e)}",
            "reject_with_rationale": ""
        }
