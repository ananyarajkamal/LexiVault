import os
import re
import json
from datetime import datetime
from typing import Dict, Any, List
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import PORTFOLIO_EXTRACTION_PROMPT

METADATA_FILE = os.path.join("data", "portfolio_metadata.json")

def load_metadata() -> Dict[str, Any]:
    """Loads portfolio metadata from the local JSON cache file."""
    os.makedirs("data", exist_ok=True)
    if not os.path.exists(METADATA_FILE):
        return {"contracts": {}}
    
    try:
        with open(METADATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "contracts" not in data:
                data = {"contracts": {}}
            return data
    except Exception as e:
        print(f"Error loading portfolio metadata: {e}")
        return {"contracts": {}}

def save_metadata(data: Dict[str, Any]):
    """Saves portfolio metadata to the local JSON cache file."""
    os.makedirs("data", exist_ok=True)
    try:
        with open(METADATA_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving portfolio metadata: {e}")

def extract_and_save_metadata(namespace: str, contract_text: str) -> Dict[str, Any]:
    """Extracts vendor, liability limit, and dates using LLM, and caches them locally."""
    if not contract_text.strip():
        return {}

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.1)
        # Using a subset of text to avoid context tokens limit
        sample_text = contract_text[:8000]
        prompt = PORTFOLIO_EXTRACTION_PROMPT.format(contract_text=sample_text)
        
        response = llm.invoke(prompt)
        raw_content = response.content.strip()
        
        # Strip markdown syntax if LLM returns it
        if raw_content.startswith("```"):
            raw_content = re.sub(r"^```json\s*|^```\s*", "", raw_content)
            raw_content = re.sub(r"\s*```$", "", raw_content)
            
        metadata = json.loads(raw_content)
        
        record = {
            "namespace": namespace,
            "vendor_name": metadata.get("vendor_name") or namespace,
            "liability_limit": int(metadata.get("liability_limit") or 0),
            "effective_date": metadata.get("effective_date"),
            "expiration_date": metadata.get("expiration_date"),
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        portfolio = load_metadata()
        portfolio["contracts"][namespace] = record
        save_metadata(portfolio)
        
        return record
        
    except Exception as e:
        print(f"Failed to extract portfolio metadata for {namespace}: {e}")
        # Default fallback record
        record = {
            "namespace": namespace,
            "vendor_name": namespace,
            "liability_limit": 0,
            "effective_date": None,
            "expiration_date": None,
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        portfolio = load_metadata()
        portfolio["contracts"][namespace] = record
        save_metadata(portfolio)
        return record

def get_portfolio_dashboard_stats() -> Dict[str, Any]:
    """Aggregates all contract records into portfolio dashboard metrics."""
    portfolio = load_metadata()
    contracts = portfolio.get("contracts", {})
    
    total_contracts = len(contracts)
    if total_contracts == 0:
        return {
            "total_contracts": 0,
            "concentration_risk": [],
            "upcoming_renewals": [],
            "total_liability": 0
        }
        
    vendor_liabilities = {}
    total_liability = 0
    upcoming_renewals = []
    
    for ns, c in contracts.items():
        vendor = c.get("vendor_name") or ns
        limit = c.get("liability_limit") or 0
        vendor_liabilities[vendor] = vendor_liabilities.get(vendor, 0) + limit
        total_liability += limit
        
        exp_date_str = c.get("expiration_date")
        if exp_date_str:
            try:
                exp_date = datetime.strptime(exp_date_str, "%Y-%m-%d")
                delta = exp_date - datetime.now()
                days_remaining = delta.days
                upcoming_renewals.append({
                    "contract": ns,
                    "vendor": vendor,
                    "expiration_date": exp_date_str,
                    "days_remaining": max(0, days_remaining)
                })
            except Exception:
                pass
                
    # Format vendor concentration shares
    concentration_risk = []
    for vendor, val in vendor_liabilities.items():
        share = int((val / total_liability * 100)) if total_liability > 0 else 0
        concentration_risk.append({
            "vendor": vendor,
            "value": val,
            "share": share
        })
        
    concentration_risk = sorted(concentration_risk, key=lambda x: x["value"], reverse=True)
    upcoming_renewals = sorted(upcoming_renewals, key=lambda x: x["days_remaining"])
    
    return {
        "total_contracts": total_contracts,
        "concentration_risk": concentration_risk,
        "upcoming_renewals": upcoming_renewals[:5],  # Return closest 5 renewals
        "total_liability": total_liability
    }
