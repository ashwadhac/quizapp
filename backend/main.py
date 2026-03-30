from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data.quiz_data import quiz_data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Quiz API Running 🚀"}

@app.get("/languages")
def get_languages():
    return list(quiz_data.keys())

@app.get("/quiz/{lang}")
def get_quiz(lang: str):
    return quiz_data.get(lang, [])