import re
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import ALCHEMY_EXPORTER_PROMPT

def convert_sla_to_code(contract_text: str, language: str) -> Dict[str, Any]:
    """
    Parses SLA terms and compiles them into a copyable Prometheus YAML alert rule.
    """
    if not contract_text.strip():
        return {
            "parameters": {},
            "code_block": "No text provided to compile."
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.3)
        prompt = ALCHEMY_EXPORTER_PROMPT.format(
            contract_text=contract_text[:12000],
            language=language
        )
        response = llm.invoke(prompt)
        output = response.content.strip()

        # Extract YAML block if present
        yaml_content = ""
        yaml_match = re.search(r"```(?:yaml|yml)?\s*(.*?)\s*```", output, re.DOTALL | re.IGNORECASE)
        if yaml_match:
            yaml_content = yaml_match.group(1).strip()
        else:
            yaml_content = output

        # Parse basic parameters from the text (heuristics)
        uptime = re.search(r"(\d+(?:\.\d+)?%)\s*(?:uptime|availability)", contract_text, re.IGNORECASE)
        latency = re.search(r"(\d+)\s*(?:ms|milliseconds)\s*(?:latency|response time)", contract_text, re.IGNORECASE)
        resolution = re.search(r"(\d+)\s*(?:hours|hrs|days|mins)\s*(?:resolution|support response|fix time)", contract_text, re.IGNORECASE)

        parameters = {
            "uptime_target": uptime.group(1) if uptime else "Not explicit (Default: 99.9%)",
            "latency_target": f"{latency.group(1)}ms" if latency else "Not explicit (Default: 500ms)",
            "resolution_target": resolution.group(0) if resolution else "Not explicit (Default: 4 hours)"
        }

        return {
            "parameters": parameters,
            "code_block": yaml_content
        }
    except Exception as e:
        return {
            "parameters": {},
            "code_block": f"Compilation failed: {str(e)}"
        }
