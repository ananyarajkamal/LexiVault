# LexiVault

LexiVault is a fully private AI document intelligence tool. It reads legal and business documents, extracts key clauses, flags risks, explains complex language in plain terms, and helps users make decisions about what they are reading. The entire document parsing, embedding generation, and vector search pipeline runs locally on the user's system to ensure absolute confidentiality.

---

## What LexiVault Is

When a contract, NDA, vendor agreement, or other legal document needs to be reviewed, professionals typically face three imperfect options:
1. Send the document to a public LLM cloud service, which is fast but risks leaking confidential business data.
2. Review it manually, which keeps the data private but takes hours and increases the chance of human error.
3. Hire external legal counsel, which is highly accurate but expensive and slow.

LexiVault is designed to be fast, private, and accurate simultaneously, providing a comprehensive suite of document intelligence and contract negotiation tools:

### Core Features
* **Bilingual Chat & Q&A**: Ask natural language questions in English or Hindi about your uploaded documents and get response citations with exact page numbers.
* **Risk Scorer & Analysis**: Extract critical clauses and automatically score risks (High/Medium/Low) based on liability caps, indemnification, non-competes, and termination, with Wolfram Alpha context integration.
* **Plain Language Mode**: Translate complex legal jargon into clear, one-sentence explanations without losing legal meaning.
* **Decision Brief Generator**: Generate structured, multi-document summaries with risks and strategic recommendations.
* **Contract Redline Autopilot**: Compare two versions of a contract to highlight character changes and analyze legal impact.
* **Contradiction Detector**: Automatically scan and flag conflicting terms across multiple agreements.

### Advanced Features
* **AI Negotiation Sandbox & Opposing Counsel Pushback Simulator**: Simulate clause-by-clause debates between customizable Buyer and Seller counsel personas, or input a proposed edit to predict counterarguments and alternative clauses from opposing counsel.
* **Negotiation Ghostwriter**: Draft diplomatic compromise language or legally sound rejections with alternatives when receiving counterparty redlined edits.
* **Semantic Diff Analyzer**: Compute similarity changes between two clauses using local sentence vector embeddings and generate a structured audit explaining the legal shifts in rights or obligations.
* **Hinglish Code-Switching explaining engine**: Translate complex legal legalese directly into conversational Hinglish (Hindi written in the Latin alphabet) for simple and intuitive understanding.
* **Contract Lifecycle Timeline Predictor**: Estimate negotiation duration, renewal risks, and expiration cascades using LLM temporal graph analysis on contract metadata.
* **Cross-Document Portfolio Risk Dashboard**: View portfolio-level analytics such as active contracts, total financial liability, vendor concentration risks, and renewal timeline cliffs.
* **The Shadow (AI vs. AI Contract Battle)**: Select a document to watch adversarial Attacker and Defender AI counsel debate clause liabilities and deliver a final legal risk assessment.
* **The Residue (Invisible Document Forensics)**: Run binary inspections of PDF bytes to extract hidden metadata (author, tools, creation dates) using PyMuPDF and perform text checks for altered boilerplates.
* **The Echo (Cross-Language Legal Harmonics)**: Compare semantic legal weight and translation traps (e.g. "best efforts" vs "reasonable efforts") across English, Hindi, and Hinglish.
* **The Alchemy (Contract to Executable Code)**: Parse SLA performance bounds (uptime, latency, resolution times) and compile them into Prometheus Alert YAML rules.

### Seamless Workspace Transition
LexiVault blends a content-rich landing page with a dedicated, focused web-application dashboard:
* **Zero-Friction Entry:** The interactive Workspace is accessible directly at the bottom of the landing page.
* **Instant Fullscreen App Mode:** The moment you engage with the workspace—whether by uploading a file, selecting a tab, clicking interactive cards, or focusing a chat/text input—the landing page copy, headers, and footers are hidden, and the workspace instantly transitions into a distraction-free 100vw/100vh application viewport.
* **Full State Preservation:** Using a single-mount layout architecture, all React state (such as indexed documents, active chat history, form inputs, and compiled outputs) is preserved during fullscreen toggling.

---

## Product Showcase

### 1. Interactive Landing Page & Advanced Mockups
![LexiVault Hero Landing Page](assets/hero.png)

### 2. Multi-Contract Portfolio Dashboard
![Portfolio Risk Dashboard](assets/portfolio.png)

### 3. Core Workspace Features
<details>
  <summary>Click to view Core Analysis Showcase (Chat, Risk Scoring, Plain Language, Brief, Redline, Contradictions)</summary>
  <br/>

  #### Bilingual Chat & Q&A
  ![Bilingual Chat & Q&A](assets/chat.png)

  #### Risk Scorer & Analysis
  ![Risk Scorer & Analysis](assets/risks.png)

  #### Plain Language Mode
  ![Plain Language Mode](assets/plain.png)

  #### Multi-Document Decision Brief
  ![Multi-Document Decision Brief](assets/brief.png)

  #### Contract Redline Compare (Hindi Output)
  ![Contract Redline Compare](assets/redline.png)

  #### Contradiction Detector (Hindi Output)
  ![Contradiction Detector](assets/contradictions.png)
</details>

### 4. Advanced Intelligence Showcase
<details>
  <summary>Click to view Advanced Features (Negotiation Sandbox, Semantic Diff, Contract Battle, Timeline, Forensics, SLA Compiler)</summary>
  <br/>

  #### AI Negotiation Sandbox
  ![AI Negotiation Sandbox](assets/negotiate.png)

  #### Semantic Diff Analyzer
  ![Semantic Diff Analyzer](assets/diff.png)

  #### AI vs. AI Contract Battle (The Shadow)
  ![AI vs. AI Contract Battle](assets/shadow.png)

  #### Contract Lifecycle Timeline Predictor
  ![Contract Lifecycle Timeline](assets/timeline.png)

  #### Invisible Document Forensics (The Residue)
  ![Invisible Document Forensics](assets/residue.png)

  #### Cross-Language Legal Harmonics (The Echo)
  ![Cross-Language Legal Harmonics](assets/echo.png)

  #### Contract-to-Code Compiler (The Alchemy)
  ![Contract-to-Code Compiler](assets/alchemy.png)
</details>

---

## Target Audience

LexiVault is tailored for professionals who frequently handle legal and business documents without a dedicated legal team:
* Startup Founders: Who review and sign dozens of contracts, NDAs, and partnership agreements per year.
* Product Managers: Who need to scan vendor API agreements for critical terms, liabilities, and data ownership clauses.
* Business Consultants: Who compare multiple complex proposals or statements of work.
* HR Professionals: Who audit employee handbooks, policies, and contracts.

---

## Technical Architecture and Privacy Model

LexiVault uses a hybrid local-ingestion RAG (Retrieval-Augmented Generation) pipeline:

1. Text Extraction: PDF files are parsed locally using PyMuPDF and pdfplumber. No text extraction is sent to external APIs.
2. Chunking: Extracted text is split into semantic chunks locally.
3. Local Embeddings: Chunks are converted into vector representations locally using a multilingual sentence transformer model (paraphrase-multilingual-MiniLM-L12-v2).
4. Vector Storage: Vector embeddings are indexed and stored locally on your system using a FAISS vector database.
5. Retrieval: When a query is made, the most relevant chunks are retrieved from the local FAISS index.
6. Cloud-Based LLM Inference with Local Context (Groq Cloud API): To generate responses, summaries, and legal audits, only the relevant retrieved text chunks (never the entire document) are sent to the LLM (Llama 3.3 70B / Llama 3.1 8B via the Groq Cloud API). High-risk clauses are cross-referenced with Wolfram Alpha to retrieve legal definitions and context.
7. Local Semantic Similarity: The Semantic Diff Analyzer calculates sentence vector similarity locally on your CPU using the local embedding model, before calling the LLM to audit the legal shifts, ensuring comparison data remains private.

> [!NOTE]
> All document ingestion (parsing, chunking, embeddings) and retrieval (vector storage, top-k similarity search) occur 100% locally on your machine. Final LLM inference is powered via the Groq Cloud API using ONLY the matching local context chunks.

---

## Project Structure

* / (Root) - Python FastAPI backend containing modules for PDF parsing, text chunking, local embeddings, FAISS storage, and LLM integrations.
* /frontend - React, TypeScript, and Tailwind CSS user interface.

---

## Backend API Endpoints

The FastAPI backend (`app.py`) exposes the following endpoints:

### Core Document Management
* **`GET /api/documents`** (`get_documents`): Retrieves the list of currently indexed documents and their namespaces.
* **`POST /api/upload`** (`upload_documents`): Accepts `.pdf` or `.docx` files, parses them, generates local embeddings, and persists them into FAISS indices.
* **`DELETE /api/documents/{namespace}`** (`delete_document`): Deletes a specific document from the catalog and removes its local FAISS vector index database.

### Core Analysis Endpoints
* **`POST /api/ask`** (`ask_lexivault`): Handles bilingual conversational Q&A using top-k local retrieval and cites sources.
* **`POST /api/clear-chat`** (`clear_chat`): Resets the LLM QA chain memory context.
* **`GET /api/risks`** (`analyze_risks`): Scans the document, extracts key clauses, runs risk rules (High/Medium/Low), and fetches Wolfram Alpha context for high-risk clauses.
* **`POST /api/features/plain-language`** (`plain_language`): Translates complex legalese clauses into simple, single-sentence explanations.
* **`POST /api/features/decision-brief`** (`decision_brief`): Generates structured summary briefs, risk logs, and recommendations for uploaded contracts.
* **`POST /api/features/redline`** (`redline_compare_api`): Compares two versions of a contract, audits additions/deletions, and generates a structured redline impact audit.
* **`POST /api/features/contradictions`** (`contradictions`): Compares multiple agreements to detect conflicting clauses, governing laws, or liabilities.

### Advanced Intelligence Endpoints
* **`POST /api/features/negotiate`** (`negotiate_clause`): Runs a Buyer vs. Seller multi-agent clause debate simulation to output a mediated compromise clause.
* **`POST /api/features/semantic-diff`** (`semantic_diff`): Calculates cosine similarity percentage between two clauses locally on CPU and audits the legal shift.
* **`POST /api/features/predict-timeline`** (`predict_timeline`): Analyzes contract metadata to predict negotiation duration, likely amendment frequencies, and renewal cliffs.
* **`POST /api/features/counterparty-sim`** (`counterparty_sim`): Simulates opposing counsel objections and counter-proposals to user-proposed clause edits.
* **`POST /api/features/ghostwrite`** (`ghostwrite`): Drafts compromise versions or legally sound rejections with fallbacks when receiving counterparty markups.
* **`POST /api/features/shadow`** (`shadow_battle`): Exposes the **The Shadow** feature, conducting adversarial Attacker vs. Defender debates on clause liability.
* **`POST /api/features/residue`** (`residue_forensics`): Exposes the **The Residue** feature, extracting hidden PDF byte metadata and flagging altered standard boilerplate text.
* **`POST /api/features/echo`** (`echo_harmonics`): Exposes the **The Echo** feature, auditing translation traps and semantic equivalence weights across English, Hindi, and Hinglish.
* **`POST /api/features/alchemy`** (`alchemy_exporter`): Exposes the **The Alchemy** feature, parsing SLA uptime/latency clauses and exporting copyable Prometheus Alert YAML rules.
* **`GET /api/portfolio/dashboard`** (`portfolio_dashboard`): Aggregates liability caps, active contracts count, vendor concentrations, and renewal dates into portfolio stats.

---

## Prerequisites

Before setting up the project, make sure you have the following installed on your system:
* **Python 3.8+**
* **Node.js** (v18 or newer recommended, with npm)
* **Tesseract OCR**
  * *Windows:* Install via installer and add to your System PATH.
  * *macOS:* Install via Homebrew: `brew install tesseract`
  * *Linux:* Install via apt: `sudo apt-get install tesseract-ocr`

---

## Getting Started

Follow these steps to run both the backend and frontend locally:

### 1. Environment Configuration

The application uses environment variables for the LLM inference (via Groq) and the Wolfram legal context service.

1. Create a copy of .env.example in the root folder and name it .env:
   ```bash
   cp .env.example .env
   ```
2. Open .env and fill in your API keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   WOLFRAM_APP_ID=your_wolfram_app_id_here
   ```

---

### 2. Run the Backend (FastAPI)

1. Open your terminal at the root directory of the project.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   
   # Windows (CMD/PowerShell)
   .venv\Scripts\activate
   
   # macOS/Linux
   source .venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI backend server:
   ```bash
   python app.py
   ```
   The backend will start and listen on http://localhost:8000.

---

### 3. Run the Frontend (React and Vite)

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL in your browser (usually http://localhost:5173).

---

## Verification and Build

To verify that the frontend compiles cleanly for production:
```bash
cd frontend
npm run build
```
