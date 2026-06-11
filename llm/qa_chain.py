from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import LEGAL_QA_PROMPT

class QAChain:
    def __init__(self):
        self.llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.2)

    def answer(self, question: str, chunks: list) -> str:
        if not chunks: return "No documents loaded to answer the question."
        try:
            context = "\n".join([c if isinstance(c, str) else c.page_content for c in chunks])
            prompt = LEGAL_QA_PROMPT.format(context=context, question=question)
            return self.llm.invoke(prompt).content
        except Exception as e:
            return f"Error: {str(e)}"
