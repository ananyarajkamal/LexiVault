"""
config.py - Central configuration module for LexiVault.

Loads all environment variables from .env file and provides them as module-level
constants. Every other module imports configuration values from here.
Never access os.environ directly in any other file.
"""

from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
WOLFRAM_APP_ID = os.getenv("WOLFRAM_APP_ID")

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
TOP_K = 5
EMBEDDING_MODEL = "paraphrase-multilingual-MiniLM-L12-v2"
LLM_MODEL = "llama-3.3-70b-versatile"
FAISS_INDEX_PATH = "data/faiss_index"
