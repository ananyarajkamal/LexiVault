"""
chunker.py - Text chunking module for LexiVault.

Splits extracted document text into overlapping chunks using LangChain's
RecursiveCharacterTextSplitter. Preserves page markers in each chunk for
accurate downstream citation.
"""

import re
from langchain_text_splitters import RecursiveCharacterTextSplitter
from config import CHUNK_SIZE, CHUNK_OVERLAP


def chunk_text(text: str) -> list:
    """Split document text into overlapping chunks, preserving page markers.

    Uses LangChain RecursiveCharacterTextSplitter with separators ordered to
    preserve clause boundaries: double newline, single newline, period+space,
    single space. Each chunk retains its nearest preceding [PAGE N] marker so
    downstream components can cite the correct page number.

    Args:
        text: Full document text string containing [PAGE N] markers from pdf_parser.

    Returns:
        List of chunk strings, each prefixed with its relevant page marker.
        Returns an empty list if input text is empty.
    """
    if not text or not text.strip():
        return []

    try:
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=["\n\n", "\n", ". ", " "],
            length_function=len,
        )

        # Split the text into raw chunks
        raw_chunks = splitter.split_text(text)

        # Ensure each chunk has its nearest preceding page marker
        processed_chunks = []
        current_page_marker = "[PAGE 1]"

        for chunk in raw_chunks:
            # Check if this chunk contains a page marker
            page_markers = re.findall(r"\[PAGE \d+\]", chunk)
            if page_markers:
                # Update current page marker to the last one found in this chunk
                current_page_marker = page_markers[-1]
                processed_chunks.append(chunk)
            else:
                # Prepend the current page marker if the chunk doesn't have one
                processed_chunks.append(f"{current_page_marker} {chunk}")

        return processed_chunks

    except Exception as e:
        print(f"Error chunking text: {str(e)}")
        return []
