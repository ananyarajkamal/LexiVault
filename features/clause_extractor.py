"""
clause_extractor.py - Regex-based clause extraction for LexiVault.

Extracts key clauses from contract text locally using regular expression patterns,
supporting both English and Hindi contracts without external LLM calls.
"""

import re

REQUIRED_KEYS = [
    "parties",
    "effective_date",
    "termination_clause",
    "indemnification",
    "liability_cap",
    "governing_law",
    "non_compete",
    "penalty_clauses",
    "missing_clauses"
]

# Regex patterns for matching clauses
KEYWORDS = {
    "parties": [
        r"\b(?:parties|agreement is made|between|by and between|among|entered into by|hereinafter referred to as)\b",
        r"(?:पक्षकार|अनुबंधकर्ता|पक्ष|के बीच|समझौता|करार)"
    ],
    "effective_date": [
        r"\b(?:effective date|commencement date|date of this agreement|effective as of|shall commence on|date first written above)\b",
        r"(?:प्रभावी तिथि|लागू होने की तिथि|प्रभावी होने की तिथि|प्रारंभ तिथि)"
    ],
    "termination_clause": [
        r"\b(?:termination|terminate|terminating|expiration|expiry|terminate this agreement|terminate the agreement|cancellation)\b",
        r"(?:समाप्ति खंड|समाप्त करने का प्रावधान|समाप्ति|समाप्त|निरस्त)"
    ],
    "indemnification": [
        r"\b(?:indemnification|indemnify|indemnity|hold harmless|indemnifies|indemnified)\b",
        r"(?:नुकसान भरपाई|क्षतिपूर्ति|क्षतिपूरक)"
    ],
    "liability_cap": [
        r"\b(?:liability cap|limitation of liability|limit of liability|cap on liability|liability shall not exceed|maximum liability|aggregate liability|liability limit)\b",
        r"(?:देयता की सीमा|देयता सीमा|सीमित दायित्व|दायित्व की सीमा)"
    ],
    "governing_law": [
        r"\b(?:governing law|jurisdiction|governed by|laws of|governed and construed|exclusive jurisdiction|dispute resolution)\b",
        r"(?:शासी कानून|अधिकार क्षेत्र|क्षेत्राधिकार|शासकीय कानून|विवाद समाधान)"
    ],
    "non_compete": [
        r"\b(?:non-compete|noncompete|non-competition|covenant not to compete|restrictive covenant|shall not engage in|restrictive covenants|compete)\b",
        r"(?:गैर-प्रतिस्पर्धा खंड|गैर-प्रतिस्पर्धा|प्रतिस्पर्धा न करना)"
    ],
    "penalty_clauses": [
        r"\b(?:penalty|penalties|liquidated damages|late payment|forfeit|forfeiture|late fee|interest rate|default interest|fine|fines)\b",
        r"(?:जुर्माना|दंड प्रावधान|हर्जाना|पेनाल्टी|विलंब शुल्क)"
    ]
}

# Regex patterns for finding risk within a matched clause paragraph
RISK_PATTERNS = {
    "liability_cap": [
        r"\bunlimited\b", r"\bnolimit\b", r"\bno limit\b", r"\buncapped\b", r"\bno cap\b", r"\bnot limited\b",
        r"\bshall be liable for all\b", r"असीमित", r"बिना किसी सीमा"
    ],
    "indemnification": [
        r"\bunilateral\b", r"\bsolely\b", r"\bone-sided\b", r"\bcustomer shall indemnify\b",
        r"\blicensee shall indemnify\b", r"\bhold harmless\b", r"एकतरफा", r"केवल"
    ],
    "non_compete": [
        r"\bforever\b", r"\bindefinite\b", r"\bworldwide\b", r"\brestrict\b", r"\brestriction\b",
        r"हमेशा", r"दुनिया भर"
    ],
    "termination_clause": [
        r"\bconvenience\b", r"\bunilateral\b", r"\bwithout cause by\b", r"\bsole discretion\b",
        r"\bnon-refundable\b", r"एकतरफा", r"बिना किसी कारण"
    ],
    "governing_law": [
        r"\bdelaware\b", r"\bnew york\b", r"\blondon\b", r"\bsingapore\b", r"\boutside India\b",
        r"भारत के बाहर"
    ],
    "penalty_clauses": [
        r"\bforfeiture\b", r"\bforfeit\b", r"\bcompound\b", r"\bdefault rate\b", r"\b24%\b", r"\b18%\b"
    ]
}

# Precompile regex patterns for efficiency
compiled_patterns = {
    key: re.compile("|".join(patterns), re.IGNORECASE | re.UNICODE)
    for key, patterns in KEYWORDS.items()
}

compiled_risk_patterns = {
    key: re.compile("|".join(patterns), re.IGNORECASE | re.UNICODE)
    for key, patterns in RISK_PATTERNS.items()
}


def split_document(text: str) -> list:
    """Split contract text into paragraphs/blocks."""
    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    if len(paragraphs) < 3:
        paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
    return paragraphs


def extract_clauses(document_text: str) -> dict:
    """Extract key clauses locally using regex patterns.
    
    Args:
        document_text: The full text of the contract.
        
    Returns:
        A dictionary with extracted clause names as keys and paragraph values.
    """
    default_result = {key: "NOT FOUND" for key in REQUIRED_KEYS}
    if not document_text or not document_text.strip():
        return default_result

    paragraphs = split_document(document_text)
    clauses = {}

    for key in KEYWORDS.keys():
        pattern = compiled_patterns[key]
        matched_val = "NOT FOUND"

        for p in paragraphs:
            if pattern.search(p):
                cleaned_p = re.sub(r'\s+', ' ', p).strip()
                if len(cleaned_p) > 1500:
                    cleaned_p = cleaned_p[:1500] + "..."
                matched_val = cleaned_p
                break

        if matched_val != "NOT FOUND":
            is_risk = False
            if key in compiled_risk_patterns:
                if compiled_risk_patterns[key].search(matched_val):
                    is_risk = True

            # Non-compete clauses are flagged as risk by default
            if key == "non_compete":
                is_risk = True

            if is_risk:
                if not matched_val.endswith(" RISK"):
                    matched_val = matched_val.rstrip() + " RISK"

        clauses[key] = matched_val

    # Compute missing clauses
    missing = [k for k in KEYWORDS.keys() if clauses[k] == "NOT FOUND"]
    if missing:
        clauses["missing_clauses"] = (
            "The following critical clauses were not found in the agreement: "
            + ", ".join(missing)
        )
    else:
        clauses["missing_clauses"] = "None"

    # Make sure all required keys exist
    for key in REQUIRED_KEYS:
        if key not in clauses:
            clauses[key] = "NOT FOUND"

    return clauses
