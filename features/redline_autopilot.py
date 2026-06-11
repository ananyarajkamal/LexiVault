from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import REDLINE_PROMPT

def redline_compare(text_v1: str, text_v2: str, language: str) -> str:
    if not text_v1 or not text_v2: return "Need two versions."
    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.2)
        # Limit size roughly
        prompt = REDLINE_PROMPT.format(version_1=text_v1[:10000], version_2=text_v2[:10000], language=language)
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        return f"Error: {str(e)}"
