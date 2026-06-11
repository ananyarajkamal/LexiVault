from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import PLAIN_LANGUAGE_PROMPT

def explain_clause(clause_text: str, language: str) -> str:
    if not clause_text.strip(): return ""
    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.2)
        prompt = PLAIN_LANGUAGE_PROMPT.format(clause=clause_text, language=language)
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        return f"Error: {str(e)}"
