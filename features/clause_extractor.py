import json
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import CLAUSE_EXTRACTION_PROMPT

REQUIRED_KEYS = ["parties", "effective_date", "termination_clause", "indemnification", "liability_cap", "governing_law", "non_compete", "penalty_clauses", "missing_clauses"]

def extract_clauses(document_text: str) -> dict:
    default_result = {key: "EXTRACTION_FAILED" for key in REQUIRED_KEYS}
    if not document_text or not document_text.strip(): return default_result
    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.1)
        prompt = CLAUSE_EXTRACTION_PROMPT.format(contract_text=document_text)
        response = llm.invoke(prompt)
        response_text = response.content.strip()
        import re
        json_match = re.search(r"(\{.*\})", response_text, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = response_text
        clauses = json.loads(json_str.strip())
        for key in REQUIRED_KEYS:
            if key not in clauses: clauses[key] = "NOT FOUND"
        return clauses
    except Exception as e:
        print(e)
        raise e
