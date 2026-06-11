"""
pdf_parser.py - PDF text extraction module for LexiVault.

Uses PyMuPDF (fitz) as the primary parser, pdfplumber as fallback for
table-heavy documents, and Tesseract OCR for scanned documents.
Preserves page boundary markers for downstream clause citation.
"""

import re

try:
    import fitz  # PyMuPDF
except ImportError:
    fitz = None

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

try:
    import pytesseract
    from PIL import Image
    import io
except ImportError:
    pytesseract = None


def _clean_text(text: str) -> str:
    """Remove headers, footers, and page numbers from extracted text.

    Args:
        text: Raw extracted text from a single page.

    Returns:
        Cleaned text with common headers/footers/page numbers stripped.
    """
    # Remove common page number patterns
    text = re.sub(r"(?m)^\s*[-–—]?\s*\d+\s*[-–—]?\s*$", "", text)
    text = re.sub(r"(?m)^\s*Page\s+\d+\s*(of\s+\d+)?\s*$", "", text, flags=re.IGNORECASE)

    # Remove common header/footer patterns (e.g. "Confidential", "Draft", dates at top/bottom)
    text = re.sub(r"(?m)^\s*(CONFIDENTIAL|DRAFT|PRIVILEGED)\s*$", "", text, flags=re.IGNORECASE)

    # Collapse excessive whitespace while preserving paragraph breaks
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()

    return text


def _is_scanned_page(page_text: str) -> bool:
    """Determine if a page is likely scanned (very little extractable text).

    Args:
        page_text: Text extracted from a single page.

    Returns:
        True if the page has fewer than 100 characters of text.
    """
    return len(page_text.strip()) < 100


def _extract_with_fitz(file_path: str) -> str:
    """Extract text using PyMuPDF (fitz) with OCR fallback for scanned pages.

    Args:
        file_path: Absolute path to the PDF file.

    Returns:
        Full extracted text with [PAGE N] markers.
    """
    if fitz is None:
        return ""

    doc = fitz.open(file_path)
    full_text_parts = []

    for page_num in range(len(doc)):
        page = doc[page_num]
        page_text = page.get_text("text")

        # If page appears scanned, try OCR
        if _is_scanned_page(page_text) and pytesseract is not None:
            try:
                pix = page.get_pixmap(dpi=300)
                img_data = pix.tobytes("png")
                img = Image.open(io.BytesIO(img_data))
                page_text = pytesseract.image_to_string(img, lang="hin+eng")
            except Exception:
                pass  # Keep whatever text we got from fitz

        cleaned = _clean_text(page_text)
        if cleaned:
            full_text_parts.append(f"[PAGE {page_num + 1}] {cleaned}")

    doc.close()
    return "\n\n".join(full_text_parts)


def _extract_with_pdfplumber(file_path: str) -> str:
    """Extract text using pdfplumber, better for table-heavy documents.

    Args:
        file_path: Absolute path to the PDF file.

    Returns:
        Full extracted text with [PAGE N] markers.
    """
    if pdfplumber is None:
        return ""

    full_text_parts = []

    with pdfplumber.open(file_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            page_text = page.extract_text() or ""

            # Also extract tables and append as text
            tables = page.extract_tables()
            if tables:
                for table in tables:
                    for row in table:
                        if row:
                            row_text = " | ".join([cell or "" for cell in row])
                            page_text += "\n" + row_text

            cleaned = _clean_text(page_text)
            if cleaned:
                full_text_parts.append(f"[PAGE {page_num + 1}] {cleaned}")

    return "\n\n".join(full_text_parts)


def _has_malformed_text(text: str) -> bool:
    """Check if extracted text appears malformed (common with table-heavy PDFs).

    Args:
        text: Extracted text to check.

    Returns:
        True if text shows signs of malformation.
    """
    if not text:
        return True

    # High ratio of special characters or very fragmented lines suggest malformation
    lines = text.split("\n")
    short_lines = sum(1 for line in lines if 0 < len(line.strip()) < 3)
    if len(lines) > 10 and short_lines / len(lines) > 0.5:
        return True

    return False


def parse_pdf(file_path: str) -> str:
    """Parse a PDF file and extract clean text with page boundary markers.

    Uses PyMuPDF (fitz) as the primary parser. Falls back to pdfplumber for
    table-heavy documents where fitz returns malformed text. Uses Tesseract OCR
    via pytesseract for scanned documents where direct text extraction returns
    less than 100 characters per page.

    Args:
        file_path: Absolute or relative path to the PDF file.

    Returns:
        Full clean text string with page boundaries preserved as markers in the
        format: [PAGE 1] content [PAGE 2] content. Returns an empty string if
        parsing fails entirely.
    """
    try:
        # Primary extraction with PyMuPDF
        text = _extract_with_fitz(file_path)

        # Fallback to pdfplumber if fitz result is malformed or empty
        if _has_malformed_text(text):
            pdfplumber_text = _extract_with_pdfplumber(file_path)
            if pdfplumber_text and len(pdfplumber_text) > len(text):
                text = pdfplumber_text

        # If still empty, try pdfplumber as last resort
        if not text:
            text = _extract_with_pdfplumber(file_path)

        return text

    except Exception as e:
        print(f"Error parsing PDF '{file_path}': {str(e)}")
        return ""
