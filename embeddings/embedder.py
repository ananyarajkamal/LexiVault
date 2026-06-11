"""
embedder.py - Multilingual embedding module for LexiVault.

Uses sentence-transformers with the paraphrase-multilingual-MiniLM-L12-v2 model
to generate dense vector embeddings for both Hindi and English text in a unified
embedding space, requiring no language-specific preprocessing.
"""

import numpy as np
from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL


class Embedder:
    """Generates dense vector embeddings for text using a multilingual model.

    Uses the paraphrase-multilingual-MiniLM-L12-v2 model which handles Hindi and
    English in a single unified embedding space with no language-specific
    preprocessing required. Loaded lazily and cached at the class level to optimize memory.
    """
    _instance = None
    _model = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Embedder, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        pass

    def _get_model(self):
        if Embedder._model is None:
            try:
                print(f"Lazy loading embedding model '{EMBEDDING_MODEL}'...")
                from sentence_transformers import SentenceTransformer
                Embedder._model = SentenceTransformer(EMBEDDING_MODEL)
                print("Embedding model loaded successfully.")
            except Exception as e:
                print(f"Error loading embedding model '{EMBEDDING_MODEL}': {str(e)}")
                raise
        return Embedder._model

    def embed_chunks(self, chunks: list) -> list:
        """Embed a list of text chunks into dense vectors.

        Args:
            chunks: List of text strings to embed. Can be in Hindi, English,
                    or a mix of both languages.

        Returns:
            List of numpy arrays, each representing the dense vector embedding
            of the corresponding input chunk. Returns an empty list if input
            is empty or embedding fails.
        """
        if not chunks:
            return []

        try:
            model = self._get_model()
            embeddings = model.encode(chunks, show_progress_bar=False, convert_to_numpy=True)
            return [np.array(emb, dtype=np.float32) for emb in embeddings]
        except Exception as e:
            print(f"Error embedding chunks: {str(e)}")
            return []

    def embed_query(self, query: str) -> np.ndarray:
        """Embed a single query string into a dense vector.

        Args:
            query: A single query string in Hindi or English.

        Returns:
            A numpy array representing the dense vector embedding of the query.
            Returns a zero vector if embedding fails.
        """
        if not query or not query.strip():
            return np.zeros(384, dtype=np.float32)

        try:
            model = self._get_model()
            embedding = model.encode(query, show_progress_bar=False, convert_to_numpy=True)
            return np.array(embedding, dtype=np.float32)
        except Exception as e:
            print(f"Error embedding query: {str(e)}")
            return np.zeros(384, dtype=np.float32)

