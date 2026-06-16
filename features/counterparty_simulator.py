import re
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import COUNTERPARTY_SIMULATION_PROMPT

def simulate_counterparty_pushback(clause_text: str, proposed_edit: str, language: str) -> Dict[str, Any]:
    """Simulates how the other party's counsel will respond to a proposed clause amendment."""
    if not clause_text.strip() or not proposed_edit.strip():
        return {
            "counter_arguments": "Please provide both the original clause and your proposed edit.",
            "pushback_clauses": "",
            "recommendation": ""
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.7)
        prompt = COUNTERPARTY_SIMULATION_PROMPT.format(
            clause_text=clause_text,
            proposed_edit=proposed_edit,
            language=language
        )
        response = llm.invoke(prompt)
        output = response.content.strip()
        
        counter_arguments = ""
        pushback_clauses = ""
        recommendation = ""
        
        # Parse output into counterarguments, pushback clauses, and recommendation
        args_match = re.search(r"\*?\*?COUNTER_ARGUMENTS\*?\*?:\s*(.*?)(?=\n\s*\*?\*?PUSHBACK_CLAUSES\*?\*?:|$)", output, re.DOTALL | re.IGNORECASE)
        push_match = re.search(r"\*?\*?PUSHBACK_CLAUSES\*?\*?:\s*(.*?)(?=\n\s*\*?\*?RECOMMENDATION\*?\*?:|$)", output, re.DOTALL | re.IGNORECASE)
        rec_match = re.search(r"\*?\*?RECOMMENDATION\*?\*?:\s*(.*)", output, re.DOTALL | re.IGNORECASE)
        
        if args_match:
            counter_arguments = args_match.group(1).strip()
        else:
            counter_arguments = output
            
        if push_match:
            pushback_clauses = push_match.group(1).strip()
            
        if rec_match:
            recommendation = rec_match.group(1).strip()
            
        return {
            "counter_arguments": counter_arguments,
            "pushback_clauses": pushback_clauses,
            "recommendation": recommendation
        }
        
    except Exception as e:
        return {
            "counter_arguments": f"Simulation failed: {str(e)}",
            "pushback_clauses": "",
            "recommendation": ""
        }
