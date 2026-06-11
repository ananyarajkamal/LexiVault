"""
retriever.py - Cross-document retrieval module for LexiVault.

Implements unified retrieval across all indexed document namespaces using
the Embedder for query vectorization and FAISSStore for similarity search
with result merging.
"""

from embeddings.embedder import Embedder
from vectorstore.faiss_store import FAISSStore
from config import TOP_K


class Retriever:
    """Retrieves relevant text chunks across all indexed documents.

    Performs unified cross-namespace retrieval by embedding the query, searching
    every active namespace FAISS index, and merging results ranked by similarity.
    This enables multi-document comparison and contradiction detection.
    """

    def __init__(self, namespaces: list):
        """Initialize the Retriever with a list of active document namespaces.

        Args:
            namespaces: List of namespace strings representing all currently
                        uploaded and indexed documents.
        """
        self.namespaces = namespaces
        self.embedder = Embedder()

    def retrieve(self, query: str, k: int = None) -> list:
        """Retrieve the top-k most relevant chunks from all indexed documents.

        Embeds the query, searches every active namespace FAISS index, merges
        all results, and returns the top-k most relevant chunk strings.

        Args:
            query: Query string in Hindi or English.
            k: Number of top chunks to return. Defaults to TOP_K from config.

        Returns:
            List of the top-k most relevant chunk strings from across all
            documents combined, ordered by similarity (most relevant first).
            Returns an empty list if no namespaces are active or retrieval fails.
        """
        if k is None:
            k = TOP_K

        if not self.namespaces:
            return []

        try:
            # Embed the query
            query_vector = self.embedder.embed_query(query)

            # Search each namespace
            all_results = []
            for namespace in self.namespaces:
                try:
                    store = FAISSStore(namespace)
                    results = store.search(query_vector, k)
                    all_results.append(results)
                except Exception as e:
                    print(f"Error searching namespace '{namespace}': {str(e)}")
                    continue

            # Merge and rank all results
            merged = FAISSStore.merge_results(all_results)

            # Return only the chunk strings (not scores), limited to top-k
            return [chunk for chunk, score in merged[:k]]

        except Exception as e:
            print(f"Error during retrieval: {str(e)}")
            return []
