"""
risk_scorer.py - Risk scoring module for LexiVault.

Applies deterministic risk scoring rules to extracted clauses, assigning
High, Medium, or Low risk levels based on the presence or absence of
key legal provisions and RISK flags from the clause extractor.
"""


def score_risk(clauses: dict) -> list:
    """Score legal risk for extracted clauses using comprehensive rules.

    Applies these rules:
    - If any clause contains 'RISK' (case-insensitive) in its value:
      - liability_cap, indemnification, non_compete, termination_clause -> High Risk
      - governing_law, penalty_clauses -> Medium Risk
      - effective_date, parties, missing_clauses -> Low Risk
    - If critical clauses are missing ('NOT FOUND'):
      - liability_cap -> High Risk
      - indemnification -> High Risk
      - governing_law -> Medium Risk
      - effective_date -> Low Risk

    Args:
        clauses: Dictionary of extracted clauses from clause_extractor.

    Returns:
        List of dicts, each with keys: clause_name, value, risk_level.
    """
    if not clauses:
        return []

    risk_results = []
    added_clauses = set()

    def get_value(key: str) -> str:
        val = clauses.get(key, "NOT FOUND")
        return str(val) if val is not None else "NOT FOUND"

    def add_risk(clause_name: str, value: str, risk_level: str):
        if clause_name not in added_clauses:
            risk_results.append({
                "clause_name": clause_name,
                "value": value,
                "risk_level": risk_level
            })
            added_clauses.add(clause_name)

    # 1. Check for LLM 'RISK' flags in any clause value
    for key, val in clauses.items():
        val_str = str(val)
        if "RISK" in val_str.upper():
            if key in ["liability_cap", "indemnification", "non_compete", "termination_clause"]:
                add_risk(key, val_str, "High")
            elif key in ["governing_law", "penalty_clauses"]:
                add_risk(key, val_str, "Medium")
            else:
                add_risk(key, val_str, "Low")

    # 2. Check for missing critical clauses
    # Rule: liability_cap is NOT FOUND -> High Risk
    liability_cap_val = get_value("liability_cap")
    if liability_cap_val == "NOT FOUND":
        add_risk("liability_cap", "Liability cap is missing from this contract, exposing the company to unlimited liability.", "High")

    # Rule: indemnification is NOT FOUND -> High Risk
    indemnification_val = get_value("indemnification")
    if indemnification_val == "NOT FOUND":
        add_risk("indemnification", "Indemnification clause is missing, meaning there is no protection against third-party claims.", "High")

    # Rule: governing_law is NOT FOUND -> Medium Risk
    governing_law_val = get_value("governing_law")
    if governing_law_val == "NOT FOUND":
        add_risk("governing_law", "Governing law/jurisdiction is not specified, which could lead to disputes in unfavorable jurisdictions.", "Medium")

    # Rule: effective_date is NOT FOUND -> Low Risk
    effective_date_val = get_value("effective_date")
    if effective_date_val == "NOT FOUND":
        add_risk("effective_date", "Effective date is not explicitly specified in the contract.", "Low")

    return risk_results
