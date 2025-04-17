# 💡 Code Mentor AI

**Code Mentor AI** is a full-stack AI-powered application that helps developers understand, improve, and document their code instantly. Powered by the OpenAI API, the app analyzes any given code snippet and returns:

- ✅ A plain-English explanation of what the code does
- 🔧 Suggestions for improving readability or efficiency
- 📄 Auto-generated documentation tailored to the language

---

## 🚀 Features

- Supports Python, JavaScript, TypeScript, Java, and C++
- Clean and responsive interface with no external CSS libraries
- Preserves formatting and avoids horizontal scroll
- One-click code analysis powered by OpenAI's GPT
- Lightweight and easy to run locally

---

## 🛠️ Tech Stack

| Layer     | Technology     |
|-----------|----------------|
| Frontend  | React + TypeScript + Vite |
| Backend   | FastAPI (Python) |
| AI Engine | OpenAI GPT-3.5 / GPT-4 |
| Styling   | Inline CSS-in-JS |




## Package	Why you need it
- fastapi	Your backend framework
- uvicorn[standard]	ASGI server with better performance & WebSocket support
- python-dotenv	To load your .env file with API keys
- openai	For calling OpenAI's ChatCompletion API

---

## ⚙️ Setup Instructions

### 🔧 Backend (FastAPI)   

- cd backend 
- pip install -r requirements.txt

## Start server:
- uvicorn main:app --reload --port 8000 ( you must be in cd backend)

##   Frontend
- than open new terminal and : 
- cd frontend
- npm install
- npm run dev

