from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from dotenv import load_dotenv
import os
import json
import re

# Load environment variables
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# FastAPI app
app = FastAPI(title="Code Mentor API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class AnalysisRequest(BaseModel):
    code: str
    language: str

class AnalysisResponse(BaseModel):
    explanation: str
    improvements: List[str]
    documentation: str

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key is not configured")

    # Updated prompt
    system_prompt = f"""
    You are an expert code reviewer and documentation specialist.
    Analyze the following {request.language} code and provide:
    1. A clear explanation of what the code does.
    2. A list of improvements (as an array).
    3. Professional documentation for the code.

    Reply ONLY with JSON. No extra explanation or markdown.
    Format:
    {{
        "explanation": "...",
        "improvements": ["..."],
        "documentation": "..."
    }}
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.code}
            ],
            temperature=0.7
        )

        content = response.choices[0].message.content.strip()

        # Clean and parse GPT response
        cleaned = re.sub(r"```(?:json)?", "", content).strip()

        try:
            result = json.loads(cleaned)
        except json.JSONDecodeError:
            raise HTTPException(status_code=500, detail="OpenAI returned invalid JSON.")

        documentation = result.get("documentation", "No documentation")
        if isinstance(documentation, list):
            documentation = "\n".join(documentation)

        return AnalysisResponse(
            explanation=result.get("explanation", "No explanation"),
            improvements=result.get("improvements", []),
            documentation=documentation
        )

    except Exception as e:
        return AnalysisResponse(
            explanation=f"Error analyzing code: {str(e)}",
            improvements=["Check your backend or OpenAI key."],
            documentation="No documentation due to error."
        )

@app.get("/")
async def root():
    return {"status": "Code Mentor API is running"}
