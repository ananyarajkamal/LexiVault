import re
from typing import Dict, Any
from langchain_groq import ChatGroq
from config import GROQ_API_KEY, LLM_MODEL
from llm.prompts import SHADOW_BATTLE_PROMPT

def conduct_shadow_battle(contract_text: str, language: str) -> Dict[str, Any]:
    """
    Finds the most controversial clause and runs a simulated debate
    between Attacker and Defender personas.
    """
    if not contract_text.strip():
        return {
            "clause_focus": "No text provided.",
            "attacker_turn": "",
            "defender_turn": "",
            "assessment": ""
        }

    try:
        llm = ChatGroq(model=LLM_MODEL, api_key=GROQ_API_KEY, temperature=0.7)
        prompt = SHADOW_BATTLE_PROMPT.format(
            contract_text=contract_text[:12000],  # safety truncation
            language=language
        )
        response = llm.invoke(prompt)
        output = response.content.strip()

        clause_focus = ""
        attacker_turn = ""
        defender_turn = ""
        assessment = ""

        # Parse sections using exact markers
        focus_match = re.search(r"CLAUSE_FOCUS:\s*(.*?)(?=\n\s*ATTACKER_TURN:|$)", output, re.DOTALL | re.IGNORECASE)
        attack_match = re.search(r"ATTACKER_TURN:\s*(.*?)(?=\n\s*DEFENDER_TURN:|$)", output, re.DOTALL | re.IGNORECASE)
        defend_match = re.search(r"DEFENDER_TURN:\s*(.*?)(?=\n\s*ASSESSMENT:|$)", output, re.DOTALL | re.IGNORECASE)
        assess_match = re.search(r"ASSESSMENT:\s*(.*)", output, re.DOTALL | re.IGNORECASE)

        if focus_match:
            clause_focus = focus_match.group(1).strip()
        else:
            clause_focus = "General liability terms"

        if attack_match:
            attacker_turn = attack_match.group(1).strip()
        else:
            attacker_turn = output

        if defend_match:
            defender_turn = defend_match.group(1).strip()

        if assess_match:
            assessment = assess_match.group(1).strip()

        return {
            "clause_focus": clause_focus,
            "attacker_turn": attacker_turn,
            "defender_turn": defender_turn,
            "assessment": assessment
        }
    except Exception as e:
        return {
            "clause_focus": f"Debate failed: {str(e)}",
            "attacker_turn": "",
            "defender_turn": "",
            "assessment": ""
        }
