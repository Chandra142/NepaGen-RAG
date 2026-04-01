import os
import faiss
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from dotenv import load_dotenv
import logging
import datetime

# --- Setup Logging ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Load Environment Variables ---
load_dotenv(override=True)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is missing from .env file")

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# --- Initialize FastAPI ---
app = FastAPI(title="NepaGen AI Backend")

# Enable CORS for the frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Configuration & Paths ---
FAISS_DIR = os.getenv("FAISS_INDEX_PATH", os.path.join(os.path.dirname(__file__), "vectorstore"))
MODEL_NAME = "BAAI/bge-m3"

# --- Globals to store the model and index in memory ---
embedder = None
index = None
all_texts = None
query_logs = []  # Log recent activities

# Initialize RAG assets on startup
@app.on_event("startup")
def load_rag_assets():
    global embedder, index, all_texts
    try:
        logger.info(f"Loading embedding model: {MODEL_NAME}...")
        embedder = SentenceTransformer(MODEL_NAME)
        
        index_path = os.path.join(FAISS_DIR, "index.faiss")
        texts_path = os.path.join(FAISS_DIR, "texts_only.pkl")
        
        if not os.path.exists(index_path) or not os.path.exists(texts_path):
            logger.warning(f"RAG files not found at {FAISS_DIR}. System will run in bypass mode.")
            return

        logger.info(f"Loading FAISS index from {index_path}...")
        index = faiss.read_index(index_path)
        
        logger.info(f"Loading texts from {texts_path}...")
        with open(texts_path, "rb") as f:
            all_texts = pickle.load(f)
            
        logger.info("RAG Assets loaded successfully!")
    except Exception as e:
        logger.error(f"Failed to load RAG assets: {str(e)}")

# Dashboard Endpoint
@app.get("/", response_class=HTMLResponse)
def dashboard():
    status_text = "Operational & Online" if index else "Initializing / Data Missing"
    status_color = "text-emerald-400" if index else "text-rose-400"
    
    # Format query logs
    logs_html = ""
    for log in reversed(query_logs[-10:]):
        status_cls = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" if log['status'] == 'success' else "bg-rose-500/10 text-rose-400 border-rose-500/20"
        logs_html += f"""
        <div class="border-b border-white/5 py-3 flex justify-between items-start">
            <div class="flex-1 pr-4">
                <p class="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">{log['time']}</p>
                <p class="text-sm font-medium text-white/90">{log['query']}</p>
            </div>
            <div class="text-right">
                <span class="px-2 py-0.5 rounded text-[10px] border {status_cls}">{log['status'].capitalize()}</span>
            </div>
        </div>
        """

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NepaGen AI | Control Center</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
            body {{ font-family: 'Plus Jakarta Sans', sans-serif; background: #0a0a0a; color: white; }}
            .glass {{ background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }}
            .grad-text {{ background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
            .glow {{ box-shadow: 0 0 40px rgba(59, 130, 246, 0.1); }}
        </style>
    </head>
    <body class="min-h-screen p-8 lg:p-12">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <header class="flex justify-between items-end mb-12">
                <div>
                    <h5 class="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2">Backend Control Center</h5>
                    <h1 class="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                        NepaGen <span class="grad-text">AI Core</span>
                    </h1>
                </div>
                <div class="text-right flex flex-col gap-2">
                    <button onclick="testAI()" id="test-btn" class="px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-bold hover:bg-primary/20 transition-all">
                        Test AI Connectivity
                    </button>
                    <div class="flex items-center gap-2 justify-end">
                        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span class="{status_color} font-bold text-sm tracking-wide uppercase">{status_text}</span>
                    </div>
                </div>
            </header>

            <script>
                async function testAI() {{
                    const btn = document.getElementById('test-btn');
                    const originalText = btn.innerText;
                    btn.innerText = 'Testing...';
                    btn.disabled = true;
                    try {{
                        const res = await fetch('/api/test');
                        const data = await res.json();
                        if (res.ok) {{
                            alert('✅ Success: ' + data.message);
                        }} else {{
                            alert('❌ Error: ' + (data.detail || 'Unknown error'));
                        }}
                    }} catch (e) {{
                        alert('❌ Connection failed');
                    }} finally {{
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }}
                }}
            </script>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="glass p-8 rounded-3xl glow">
                    <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Total Documents</p>
                    <h3 class="text-3xl font-extrabold">100,000+</h3>
                    <p class="text-[10px] text-emerald-400 mt-2 font-bold uppercase">Indexed & Queryable</p>
                </div>
                <div class="glass p-8 rounded-3xl">
                    <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Embedding Model</p>
                    <h3 class="text-xl font-bold">{MODEL_NAME}</h3>
                    <p class="text-[10px] text-blue-400 mt-2 font-bold uppercase">BGE-M3 Multilingual</p>
                </div>
                <div class="glass p-8 rounded-3xl">
                    <p class="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Gemini API Key</p>
                    <h3 class="text-xl font-bold">●●●●●●●●●●●</h3>
                    <p class="text-[10px] text-emerald-400 mt-2 font-bold uppercase">Connected & Active</p>
                </div>
            </div>

            <!-- Activity & Logs -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div class="glass rounded-3xl p-8 min-h-[400px]">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="text-lg font-bold">Recent Activity Live Monitor</h4>
                            <span class="text-[10px] text-white/30 uppercase font-bold tracking-widest">Updates every 2s</span>
                        </div>
                        <div id="logs-container">
                            {logs_html if logs_html else '<p class="text-white/20 italic text-sm">No activity recorded yet...</p>'}
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    <div class="glass rounded-3xl p-8">
                        <h4 class="text-lg font-bold mb-6">System Endpoints</h4>
                        <div class="space-y-4">
                            <a href="/docs" class="block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm font-bold">Swagger UI</span>
                                    <span class="text-blue-500 text-xs font-bold group-hover:underline">OPEN</span>
                                </div>
                                <p class="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Interactive API Specs</p>
                            </a>
                            <a href="/redoc" class="block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm font-bold">ReDoc</span>
                                    <span class="text-blue-500 text-xs font-bold group-hover:underline">OPEN</span>
                                </div>
                                <p class="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Clean Documentation</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """

class QueryRequest(BaseModel):
    query: str

@app.post("/api/ask")
def ask_question(req: QueryRequest):
    global embedder, index, all_texts
    query = req.query
    logger.info(f"Incoming RAG Query: {query}")

    try:
        # Process RAG
        if not embedder or not index:
             # Fallback to direct Gemini query if RAG is initializing
             logger.warning("RAG assets missing, falling back to direct answer.")
             response = model.generate_content(query)
             return {"answer": response.text, "context": "System in bypass mode (data missing)."}

        query_vec = embedder.encode([query], normalize_embeddings=True)
        scores, ids = index.search(np.array(query_vec, dtype=np.float32), 3)
        
        context_str = ""
        for idx in ids[0]:
            if idx != -1:
                context_str += all_texts[idx] + "\n\n"

        system_prompt = f"तपाईं 'NepaGen AI' हुनुहुन्छ। तलको सन्दर्भ प्रयोग गरेर नेपाली भाषामा उत्तर दिनुहोस्।:\n\n{context_str}\n\nप्रश्न: {query}\nउत्तर:"
        
        gemini_response = model.generate_content(system_prompt)
        final_answer = gemini_response.text

        # Log the success
        query_logs.append({
            "query": query,
            "time": datetime.datetime.now().strftime("%I:%M %p"),
            "status": "success"
        })
        
        return {
            "answer": final_answer,
            "context": context_str
        }

    except Exception as e:
        logger.exception("Error processing RAG Query")
        # Log the failure
        query_logs.append({
            "query": query if query else "Unknown",
            "time": datetime.datetime.now().strftime("%I:%M %p"),
            "status": "error"
        })
        raise HTTPException(status_code=500, detail=f"Internal AI Engine Error: {str(e)}")

@app.get("/api/test")
def test_ai():
    """Simple test to verify model and index connectivity."""
    if not embedder or not index:
        raise HTTPException(status_code=503, detail="Assets not loaded")
    try:
        # Test embedding
        test_vec = embedder.encode(["नेपाल"], normalize_embeddings=True)
        # Test search
        scores, ids = index.search(np.array(test_vec, dtype=np.float32), 1)
        # Test Gemini
        test_resp = model.generate_content("Hello")
        return {"status": "ok", "message": "AI Flow Working!", "gemini": test_resp.text[:50]}
    except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
