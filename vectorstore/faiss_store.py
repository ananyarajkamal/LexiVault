"""
faiss_store.py - FAISS vector index storage module for LexiVault.

Manages building, persisting, loading, and searching FAISS IndexFlatL2 indices.
Supports namespaced indices for multi-document storage and cross-document
querying via the merge_results static method.
"""

import os
import pickle
import numpy as np
import faiss
from config import FAISS_INDEX_PATH


class FAISSStore:
    """Manages FAISS vector indices for document chunk storage and retrieval.

    Each instance operates on a specific namespace (document name), allowing
    independent index management per document. The merge_results static method
    enables cross-document queries by combining results from multiple namespaces.
    """

    def __init__(self, namespace: str):
        """Initialize FAISSStore for a specific document namespace.

        Args:
            namespace: String representing the document name. Used to create
                       unique filenames for the FAISS index and chunk pickle files.
        """
        self.namespace = namespace
        self.index = None
        self.chunks = []
        self._index_dir = FAISS_INDEX_PATH
        os.makedirs(self._index_dir, exist_ok=True)

    def _index_path(self) -> str:
        """Get the file path for the FAISS index.

        Returns:
            String path to the .faiss index file for this namespace.
        """
        return os.path.join(self._index_dir, f"{self.namespace}.faiss")

    def _chunks_path(self) -> str:
        """Get the file path for the pickled chunks list.

        Returns:
            String path to the .pkl chunks file for this namespace.
        """
        return os.path.join(self._index_dir, f"{self.namespace}.pkl")

    def build_index(self, chunks: list, vectors: list) -> None:
        """Build a FAISS IndexFlatL2 index and persist it to disk.

        Args:
            chunks: List of chunk text strings corresponding to the vectors.
            vectors: List of numpy arrays (dense vectors) for each chunk.

        Returns:
            None. The index is saved to data/faiss_index/{namespace}.faiss and
            chunks are saved to data/faiss_index/{namespace}.pkl.
        """
        try:
            if not chunks or not vectors:
                print(f"Warning: Empty chunks or vectors for namespace '{self.namespace}'.")
                return

            # Convert vectors to a single numpy matrix
            vector_matrix = np.array(vectors, dtype=np.float32)
            dimension = vector_matrix.shape[1]

            # Build FAISS IndexFlatL2
            self.index = faiss.IndexFlatL2(dimension)
            self.index.add(vector_matrix)
            self.chunks = chunks

            # Persist to disk
            faiss.write_index(self.index, self._index_path())
            with open(self._chunks_path(), "wb") as f:
                pickle.dump(self.chunks, f)

        except Exception as e:
            print(f"Error building FAISS index for '{self.namespace}': {str(e)}")

    def load_index(self) -> bool:
        """Load a persisted FAISS index and chunks list from disk.

        Returns:
            True if the index was loaded successfully, False otherwise.
        """
        try:
            index_path = self._index_path()
            chunks_path = self._chunks_path()

            if not os.path.exists(index_path) or not os.path.exists(chunks_path):
                print(f"Index files not found for namespace '{self.namespace}'.")
                return False

            self.index = faiss.read_index(index_path)
            with open(chunks_path, "rb") as f:
                self.chunks = pickle.load(f)

            return True

        except Exception as e:
            print(f"Error loading FAISS index for '{self.namespace}': {str(e)}")
            return False

    def delete_index(self) -> None:
        """Delete the persisted index and chunks files from disk."""
        try:
            index_path = self._index_path()
            chunks_path = self._chunks_path()
            if os.path.exists(index_path):
                os.remove(index_path)
            if os.path.exists(chunks_path):
                os.remove(chunks_path)
        except Exception as e:
            print(f"Error deleting FAISS index files for '{self.namespace}': {str(e)}")

    def search(self, query_vector: np.ndarray, k: int) -> list:
        """Search the FAISS index for the top-k most similar chunks.

        Args:
            query_vector: Numpy array representing the query embedding.
            k: Number of top results to return.

        Returns:
            List of tuples (chunk_string, similarity_score) sorted by ascending
            L2 distance (most similar first). Returns an empty list if the index
            is not loaded or search fails.
        """
        try:
            if self.index is None:
                if not self.load_index():
                    return []

            # Ensure query vector is 2D
            if query_vector.ndim == 1:
                query_vector = query_vector.reshape(1, -1)

            query_vector = np.array(query_vector, dtype=np.float32)

            # Limit k to the number of indexed vectors
            actual_k = min(k, self.index.ntotal)
            if actual_k == 0:
                return []

            distances, indices = self.index.search(query_vector, actual_k)

            results = []
            for i in range(len(indices[0])):
                idx = indices[0][i]
                if 0 <= idx < len(self.chunks):
                    results.append((self.chunks[idx], float(distances[0][i])))

            return results

        except Exception as e:
            print(f"Error searching FAISS index for '{self.namespace}': {str(e)}")
            return []

    @staticmethod
    def merge_results(result_lists: list) -> list:
        """Merge and rank results from multiple namespace searches.

        Combines results from multiple FAISS index searches and sorts them
        by similarity score (ascending L2 distance, most similar first).
        This method enables cross-document queries, the Decision Brief Generator,
        and the Contradiction Detector to work across all uploaded documents
        simultaneously.

        Args:
            result_lists: List of result lists, where each result list contains
                          tuples of (chunk_string, similarity_score) from a
                          single namespace search.

        Returns:
            Single merged list of (chunk_string, similarity_score) tuples ranked
            by similarity score (lowest L2 distance first).
        """
        merged = []
        for result_list in result_lists:
            merged.extend(result_list)

        # Sort by L2 distance ascending (lower = more similar)
        merged.sort(key=lambda x: x[1])

        return merged
