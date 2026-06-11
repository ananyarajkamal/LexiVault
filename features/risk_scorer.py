"""
risk_scorer.py - Risk scoring module for LexiVault.

Applies deterministic risk scoring rules to extracted clauses, assigning
High, Medium, or Low risk levels based on the presence or absence of
key legal provisions and RISK flags from the clause extractor.
"""


def score_risk(clauses: dict) -> list:
    """Score legal risk for extracted clauses using predefined rules.

    Applies these rules in order:
    - liability_cap is 'NOT FOUND' → High Risk
    - indemnification contains 'RISK' → High Risk
    - non_compete contains 'RISK' → High Risk
    - termination_clause contains 'RISK' → High Risk
    - governing_law is 'NOT FOUND' → Medium Risk
    - penalty_clauses contains 'RISK' → Medium Risk
    - effective_date is 'NOT FOUND' → Low Risk

    Args:
        clauses: Dictionary of extracted clauses from clause_extractor.
                 Expected keys: parties, effective_date, termination_clause,
                 indemnification, liability_cap, governing_law, non_compete,
                 penalty_clauses, missing_clauses.

    Returns:
        List of dicts, each with exactly these keys:
        - clause_name (str): Name of the clause being scored.
        - value (str): The extracted value or status of the clause.
        - risk_level (str): 'High', 'Medium', or 'Low'.
    """
    if not clauses:
        return []

    risk_results = []

    # Helper to safely get string value from clauses
    def get_value(key: str) -> str:
        """Safely retrieve a clause value as a string.

        Args:
            key: The clause key to look up.

        Returns:
            String value of the clause, or 'NOT FOUND' if key is missing.
        """
        val = clauses.get(key, "NOT FOUND")
        return str(val) if val is not None else "NOT FOUND"

    # Rule 1: liability_cap is NOT FOUND → High Risk
    liability_cap_val = get_value("liability_cap")
    if liability_cap_val == "NOT FOUND":
        risk_results.append({
            "clause_name": "liability_cap",
            "value": liability_cap_val,
            "risk_level": "High",
        })

    # Rule 2: indemnification contains RISK → High Risk
    indemnification_val = get_value("indemnification")
    if "RISK" in indemnification_val.upper():
        risk_results.append({
            "clause_name": "indemnification",
            "value": indemnification_val,
            "risk_level": "High",
        })

    # Rule 3: non_compete contains RISK → High Risk
    non_compete_val = get_value("non_compete")
    if "RISK" in non_compete_val.upper():
        risk_results.append({
            "clause_name": "non_compete",
            "value": non_compete_val,
            "risk_level": "High",
        })

    # Rule 4: termination_clause contains RISK → High Risk
    termination_val = get_value("termination_clause")
    if "RISK" in termination_val.upper():
        risk_results.append({
            "clause_name": "termination_clause",
            "value": termination_val,
            "risk_level": "High",
        })

    # Rule 5: governing_law is NOT FOUND → Medium Risk
    governing_law_val = get_value("governing_law")
    if governing_law_val == "NOT FOUND":
        risk_results.append({
            "clause_name": "governing_law",
            "value": governing_law_val,
            "risk_level": "Medium",
        })

    # Rule 6: penalty_clauses contains RISK → Medium Risk
    penalty_val = get_value("penalty_clauses")
    if "RISK" in penalty_val.upper():
        risk_results.append({
            "clause_name": "penalty_clauses",
            "value": penalty_val,
            "risk_level": "Medium",
        })

    # Rule 7: effective_date is NOT FOUND → Low Risk
    effective_date_val = get_value("effective_date")
    if effective_date_val == "NOT FOUND":
        risk_results.append({
            "clause_name": "effective_date",
            "value": effective_date_val,
            "risk_level": "Low",
        })

    return risk_results
