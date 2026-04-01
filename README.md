# NepaGen AI: Nepali RAG (Retrieval-Augmented Generation)

NepaGen AI is a state-of-the-art Nepali language assistant that combines the power of **BGE-M3 Multilingual Embeddings** and **Gemini 2.0/1.5** via Retrieval-Augmented Generation. It allows users to ask questions in Nepali and receive accurate, context-aware answers grounded in a custom knowledge base.

---

## 🚀 Features

*   **Nepali NLP**: Specifically optimized for the Nepali language.
*   **Massive Knowledge Base**: Uses FAISS to index 100k+ documents for fast retrieval.
*   **Dual Architecture**: 
    *   **FastAPI Backend**: Manages retrieval logic and Gemini API integration.
    *   **React + Vite Frontend**: Provides a premium, dark-mode chat interface with `Framer Motion`.
*   **Backend Dashboard**: A built-in control panel to monitor system health and query logs.

---

## 📂 Project Structure

```text
├── backend/
│   ├── main.py              # FastAPI Server & RAG logic
│   ├── .env                 # API Keys (ignore in git)
│   ├── requirements.txt     # Python dependencies
│   └── vectorstore/         # FAISS Index files (index.faiss, texts_only.pkl)
├── frontend/
│   ├── src/                 # React components & App.jsx
│   ├── index.html           # Main entry point
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Vite proxy settings
├── .gitignore               # Keeps your repo clean
└── README.md                # Project documentation
```

---

## 🛠️ Local Setup

### 1. Backend (FastAPI)
1.  **Navigate directly** to `backend/`.
2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Set up your `.env` file**:
    ```env
    GOOGLE_API_KEY=YOUR_GEMINI_API_KEY
    FAISS_INDEX_PATH=./vectorstore  # path to your FAISS index folder
    ```
4.  **Start the server**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

### 2. Frontend (React)
1.  **Navigate** to `frontend/`.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm run dev
    ```
4.  **Access** at: `http://localhost:5173/`

---

## 🌐 Deployment

### Backend (Railway / Render / Render)
1.  **Host your FAISS index**: Since the index is large (>100MB), either include it in the repo (using **Git LFS**) or host it on an external storage (like AWS S3) and download it during build.
2.  **Configure environment variables**: Set `GOOGLE_API_KEY` and `FAISS_INDEX_PATH`.
3.  **Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel / Netlify)
1.  **Build the app**:
    ```bash
    npm run build
    ```
2.  **Target directory**: Deploy the `dist/` folder.
3.  **Proxying**: In production, ensure the API request points to your deployed backend URL.

---

Made by Antigravity AI
