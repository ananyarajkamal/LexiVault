# LexiVault

LexiVault is a fully private AI document intelligence tool. It reads legal and business documents, extracts key clauses, flags risks, explains complex language in plain terms, and helps users make decisions about what they are reading. The entire document parsing, embedding generation, and vector search pipeline runs locally on the user's system to ensure absolute confidentiality.

---

## What LexiVault Is

When a contract, NDA, vendor agreement, or other legal document needs to be reviewed, professionals typically face three imperfect options:
1. Send the document to a public LLM cloud service, which is fast but risks leaking confidential business data.
2. Review it manually, which keeps the data private but takes hours and increases the chance of human error.
3. Hire external legal counsel, which is highly accurate but expensive and slow.

LexiVault is designed to be fast, private, and accurate simultaneously. It allows users to upload documents, ask questions in a chat interface, generate structured summaries (decision briefs), compare versions to find changes (redline autopilot), and audit conflict terms (contradiction detector) without any of the document content leaving the local machine.

Furthermore, LexiVault features advanced contract intelligence tools:
* AI Negotiation Sandbox: Simulate clause-by-clause debates between customizable Buyer and Seller legal counsel personas and retrieve a mediated compromise terms proposal.
* Semantic Diff Analyzer: Compute similarity changes between two clauses using local sentence vector embeddings and generate a structured audit explaining the legal shifts in rights or obligations.
* Hinglish Code-Switching explaining engine: Translate complex legal legalese directly into conversational Hinglish (Hindi written in the Latin alphabet) for simple and intuitive understanding.

---

## Target Audience

LexiVault is tailored for professionals who frequently handle legal and business documents without a dedicated legal team:
* Startup Founders: Who review and sign dozens of contracts, NDAs, and partnership agreements per year.
* Product Managers: Who need to scan vendor API agreements for critical terms, liabilities, and data ownership clauses.
* Business Consultants: Who compare multiple complex proposals or statements of work.
* HR Professionals: Who audit employee handbooks, policies, and contracts.

---

## Technical Architecture and Privacy Model

LexiVault uses a hybrid, local-first RAG (Retrieval-Augmented Generation) pipeline:

1. Text Extraction: PDF files are parsed locally using PyMuPDF and pdfplumber. No text extraction is sent to external APIs.
2. Chunking: Extracted text is split into semantic chunks locally.
3. Local Embeddings: Chunks are converted into vector representations locally using a multilingual sentence transformer model (paraphrase-multilingual-MiniLM-L12-v2).
4. Vector Storage: Vector embeddings are indexed and stored locally on your system using a FAISS vector database.
5. Retrieval: When a query is made, the most relevant chunks are retrieved from the local FAISS index.
6. Local-First Inference: Only the relevant retrieved text chunks are sent to the LLM (Llama 3.3 70B via the Groq Cloud API) to generate final answers, summaries, and assessments, ensuring that entire documents are never uploaded to a cloud environment. High-risk clauses are cross-referenced with Wolfram to retrieve legal definitions and context.
7. Local Semantic Similarity: The Semantic Diff Analyzer calculates sentence vector similarity locally on your CPU using the local embedding model, before calling the LLM to audit the legal shifts, ensuring comparison data remains completely private.

---

## Project Structure

* / (Root) - Python FastAPI backend containing modules for PDF parsing, text chunking, local embeddings, FAISS storage, and LLM integrations.
* /frontend - React, TypeScript, and Tailwind CSS user interface.

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
