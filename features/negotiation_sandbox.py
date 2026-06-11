import re
from typing import Dict, Any, List
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import (
    NEGOTIATION_BUYER_PROMPT,
    NEGOTIATION_SELLER_PROMPT,
    NEGOTIATION_MEDIATOR_PROMPT
)

def simulate_negotiation(clause_text: str, clause_type: str, buyer_stance: str, seller_stance: str, language: str) -> Dict[str, Any]:
    """Simulates a multi-turn legal negotiation between Buyer, Seller, and Mediator agents."""
    if not clause_text.strip():
        return {
            "original_clause": "",
            "transcript": [],
            "compromise_clause": "",
            "explanation": "No text provided to negotiate."
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.7)
        
        # Turn 1: Buyer Counsel opening objection and amendment proposal
        buyer_prompt = NEGOTIATION_BUYER_PROMPT.format(
            stance=buyer_stance,
            clause_type=clause_type,
            current_text=clause_text,
            language=language
        )
        buyer_res = llm.invoke(buyer_prompt)
        buyer_message = buyer_res.content.strip()
        
        # Turn 2: Seller Counsel counter-argument and proposal
        seller_prompt = NEGOTIATION_SELLER_PROMPT.format(
            stance=seller_stance,
            clause_type=clause_type,
            buyer_proposal=buyer_message,
            language=language
        )
        seller_res = llm.invoke(seller_prompt)
        seller_message = seller_res.content.strip()
        
        # Turn 3: Buyer Counsel final compromise offer
        buyer_final_prompt = (
            f"You are the Buyer's legal counsel. Review the Seller's counterproposal: '{seller_message}'. "
            f"Write a brief closing compromise statement offering a final terms revision. Write in {language}."
        )
        buyer_final_res = llm.invoke(buyer_final_prompt)
        buyer_final_message = buyer_final_res.content.strip()
        
        # Compile Dialogues
        transcript = [
            {"role": "Buyer Counsel", "message": buyer_message},
            {"role": "Seller Counsel", "message": seller_message},
            {"role": "Buyer Counsel (Final Offer)", "message": buyer_final_message}
        ]
        
        transcript_str = "\n".join([f"{t['role']}: {t['message']}" for t in transcript])
        
        # Turn 4: Mediator compromises and crafts the final clause
        mediator_prompt = NEGOTIATION_MEDIATOR_PROMPT.format(
            clause_type=clause_type,
            transcript=transcript_str,
            language=language
        )
        mediator_res = llm.invoke(mediator_prompt)
        mediator_output = mediator_res.content.strip()
        
        # Parse Mediator output
        compromise_clause = ""
        explanation = ""
        
        comp_match = re.search(r"COMPROMISE_CLAUSE:\s*(.*?)(?=\n\s*EXPLANATION:|$)", mediator_output, re.DOTALL | re.IGNORECASE)
        expl_match = re.search(r"EXPLANATION:\s*(.*)", mediator_output, re.DOTALL | re.IGNORECASE)
        
        if comp_match:
            compromise_clause = comp_match.group(1).strip()
        else:
            # Fallback in case of raw output formatting mismatch
            parts = mediator_output.split("\n\n")
            compromise_clause = parts[0]
            
        if expl_match:
            explanation = expl_match.group(1).strip()
        else:
            explanation = mediator_output
            
        return {
            "original_clause": clause_text,
            "transcript": transcript,
            "compromise_clause": compromise_clause,
            "explanation": explanation
        }
        
    except Exception as e:
        return {
            "original_clause": clause_text,
            "transcript": [],
            "compromise_clause": "",
            "explanation": f"Negotiation simulation failed: {str(e)}"
        }
