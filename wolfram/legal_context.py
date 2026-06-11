"""
legal_context.py - Wolfram Alpha legal context lookup module for LexiVault.

Queries the Wolfram Alpha Short Answers API for legal definitions relevant
to high-risk clauses. Only makes API calls for High Risk items to conserve
the 2000 free monthly call limit.
"""

import requests
import urllib.parse
from config import WOLFRAM_APP_ID


def get_legal_context(clause_name: str, risk_level: str) -> str:
    """Query Wolfram Alpha for legal context on a high-risk clause.

    Only proceeds if risk_level is exactly 'High' to stay within the 2000 free
    API calls per month limit. Queries the Wolfram Alpha Short Answers API with
    the clause name combined with 'legal definition India'.

    Args:
        clause_name: Name of the legal clause to look up (e.g., 'liability_cap',
                     'indemnification').
        risk_level: Risk level string. Must be exactly 'High' for the API call
                    to proceed. Returns empty string for 'Medium' or 'Low'.

    Returns:
        Wolfram Alpha response text string with the legal definition/context.
        Returns an empty string if:
        - risk_level is not 'High'
        - WOLFRAM_APP_ID is not configured
        - The request fails, times out, or returns non-200 status
    """
    # Only call Wolfram Alpha for High Risk clauses
    if risk_level != "High":
        return ""

    # Check if API key is configured
    if not WOLFRAM_APP_ID or WOLFRAM_APP_ID == "your_wolfram_app_id_here":
        return ""

    try:
        # Build the query string
        query = f"{clause_name} legal definition India"
        encoded_query = urllib.parse.quote(query)

        # Build the request URL
        url = (
            f"http://api.wolframalpha.com/v1/result"
            f"?appid={WOLFRAM_APP_ID}"
            f"&i={encoded_query}"
        )

        # Make the GET request with timeout
        response = requests.get(url, timeout=10)

        # Check for successful response
        if response.status_code == 200:
            return response.text.strip()
        else:
            return ""

    except requests.exceptions.Timeout:
        return ""
    except requests.exceptions.RequestException:
        return ""
    except Exception:
        return ""
