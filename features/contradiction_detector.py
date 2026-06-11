from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import CONTRADICTION_PROMPT

def detect_contradictions(chunks: list, language: str) -> str:
    if not chunks: return "No chunks provided."
    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.2)
        context = "\n".join([c if isinstance(c, str) else c.page_content for c in chunks])
        prompt = CONTRADICTION_PROMPT.format(context=context, language=language)
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        return f"Error: {str(e)}"
