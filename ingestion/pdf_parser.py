"""
pdf_parser.py - PDF text extraction module for LexiVault.

Uses PyMuPDF (fitz) as the primary parser, pdfplumber as fallback for
table-heavy documents, and Tesseract OCR for scanned documents.
Preserves page boundary markers for downstream clause citation.
"""

import re
import os

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


def _count_devanagari(text: str) -> int:
    """Count the number of Devanagari Unicode characters in the text.

    Args:
        text: Text to analyze.

    Returns:
        The count of Devanagari characters.
    """
    if not text:
        return 0
    return len(re.findall(r"[\u0900-\u097F]", text))


def _extract_with_fitz(file_path: str, force_ocr: bool = False) -> str:
    """Extract text using PyMuPDF (fitz) with OCR fallback for scanned pages.

    Args:
        file_path: Absolute path to the PDF file.
        force_ocr: If True, forces OCR for all pages.

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

        # If page appears scanned, or OCR is forced, try OCR
        if (force_ocr or _is_scanned_page(page_text)) and pytesseract is not None:
            try:
                pix = page.get_pixmap(dpi=300)
                img_data = pix.tobytes("png")
                img = Image.open(io.BytesIO(img_data))
                page_text = pytesseract.image_to_string(img, lang="hin+eng")
            except Exception as e:
                err_str = str(e)
                if "tesseract is not installed" in err_str.lower() or "tesseractNotFoundError" in err_str or "path" in err_str.lower():
                    print(
                        f"Warning: Tesseract binary not found or not in PATH. "
                        f"Cannot run OCR for page {page_num + 1}. Please install Tesseract-OCR "
                        f"with Hindi language pack to enable OCR extraction."
                    )
                else:
                    print(f"Error during OCR extraction on page {page_num + 1}: {e}")
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


def parse_pdf(file_path: str, language: str = "English") -> str:
    """Parse a PDF file and extract clean text with page boundary markers.

    Uses PyMuPDF (fitz) as the primary parser. Falls back to pdfplumber for
    table-heavy documents where fitz returns malformed text. Uses Tesseract OCR
    via pytesseract for scanned documents or garbled Hindi text.

    Args:
        file_path: Absolute or relative path to the PDF file.
        language: User's selected document language ("Hindi", "Hinglish", "English").

    Returns:
        Full clean text string with page boundaries preserved as markers in the
        format: [PAGE 1] content [PAGE 2] content. Returns an empty string if
        parsing fails entirely.
    """
    try:
        force_ocr = False

        # Determine if we should force OCR for Hindi documents
        is_hindi_expected = (
            language.lower() in ("hindi", "hi") or 
            "hindi" in os.path.basename(file_path).lower()
        )

        if is_hindi_expected and fitz is not None and pytesseract is not None:
            try:
                # Perform a quick OCR test on page 1 to see if it yields Devanagari text
                doc = fitz.open(file_path)
                if len(doc) > 0:
                    first_page = doc[0]
                    native_text = first_page.get_text("text")
                    native_dev_count = _count_devanagari(native_text)

                    # If native text lacks Devanagari characters, test with OCR
                    if native_dev_count < 10:
                        pix = first_page.get_pixmap(dpi=150)  # Lower DPI for speed
                        img_data = pix.tobytes("png")
                        img = Image.open(io.BytesIO(img_data))
                        ocr_text = pytesseract.image_to_string(img, lang="hin+eng")
                        ocr_dev_count = _count_devanagari(ocr_text)

                        # If OCR recovers Devanagari but native text doesn't, we force OCR
                        if ocr_dev_count > 10:
                            print(
                                f"Garbled Hindi text detected natively ({native_dev_count} Devanagari chars) "
                                f"but recovered by OCR ({ocr_dev_count} Devanagari chars). Forcing OCR."
                            )
                            force_ocr = True
                doc.close()
            except Exception as e:
                print(f"Heuristic OCR check failed: {e}")

        # Primary extraction with PyMuPDF
        text = _extract_with_fitz(file_path, force_ocr=force_ocr)

        # Fallback to pdfplumber if fitz result is malformed or empty
        # But do not fallback to pdfplumber if force_ocr is active (since pdfplumber lacks OCR)
        if not force_ocr:
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
