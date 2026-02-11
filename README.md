# LegalLens ⚖️

**Don't Agree Blindly. Know What You're Signing.**

LegalLens is a modern legal-tech web application that uses AI to instantly scan PDF contracts and Terms & Conditions. It identifies hidden risks, provides a plain-English summary, and highlights potential "red flags" directly within the document text.

## 🚀 Features

* **AI-Powered Analysis**: Utilizes Google Gemini 1.5 Flash to understand context and legal jargon.
* **Risk Assessment**: Categorizes clauses into High, Medium, and Low risks (e.g., Privacy, Liability, Financial).
* **Interactive Dashboard**: Click on a risk card to auto-scroll and highlight the specific clause in the document.
* **Smart Summaries**: Get the "Gist" of a 50-page document in 5 bullet points.
* **Dark/Light Mode**: Fully responsive UI with a premium aesthetic.
* **Robust Fallback**: Automatically switches to keyword-based analysis if the AI service is unavailable.

## 🛠️ Tech Stack

### Frontend
* **React** (Vite)
* **Tailwind CSS** (Styling)
* **Lucide React** (Icons)

### Backend
* **Python** (Flask)
* **PyPDF** (Text Extraction)
* **Google Generative AI** (Gemini API)

## ⚙️ Setup & Installation

### Prerequisites
* Node.js (v16+)
* Python (v3.8+)
* A free [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Backend Setup (Flask)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    
2.  Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    
3.  Install dependencies:
    ```bash
    pip install flask flask-cors pypdf google-generativeai python-dotenv
    
4.  Configure Environment Variables:
    Create a `.env` file in the `backend` folder:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    
5.  Start the server:
    ```bash
    python app.py
        *The backend will run on `http://127.0.0.1:5000`*

### 2. Frontend Setup (React)

1.  Navigate to the frontend directory (root):
    ```bash
    cd frontend
    # or just stay in root if that's where package.json is
    
2.  Install dependencies:
    ```bash
    npm install
    
3.  Configure Environment Variables:
    Create a `.env` file in the frontend root:
    ```env
    # Local Development
    VITE_API_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)
    
    # Production (e.g., Render)
    # VITE_API_URL=[https://your-app-name.onrender.com](https://your-app-name.onrender.com)
    
4.  Start the development server:
    ```bash
    npm run dev
        *The frontend will run on `http://localhost:5173`*

## 📖 Usage

1.  Open the web app in your browser.
2.  Drag and drop a PDF contract (e.g., a SaaS Service Agreement or Rental Lease).
3.  Wait for the "Scanning..." animation to complete.
4.  Review the **Summary** on the left.
5.  Click on **Risk Cards** to jump to the exact location in the document viewer on the right.
6.  Use the **Download** button to export a text summary.

## 🤝 Troubleshooting

* **"Connection Failed"**: Ensure the Python backend is running and the `VITE_API_URL` in your frontend `.env` matches the backend address.
* **"AI Analysis Failed"**: Check your server logs. Ensure your Google API Key is valid and enabled in the `.env` file.
* **Highlights not showing**: The highlighter uses text matching. If the PDF scan quality is poor, specific keyword matching might fail, but the general text will still render.

