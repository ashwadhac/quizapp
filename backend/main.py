from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS (frontend connect easy ஆக)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Home route (IMPORTANT)
@app.get("/")
def home():
    return {"message": "Quiz API is running 🚀"}

# ✅ Quiz data
data = {
    "python": {
        "basics": [
            {"question": "Python is?", "options": ["Language", "OS", "DB", "Browser"], "answer": "Language"},
            {"question": "Print function?", "options": ["echo()", "print()", "printf()", "log()"], "answer": "print()"},
            {"question": "List symbol?", "options": ["{}", "[]", "()", "<>"], "answer": "[]"},
            {"question": "Keyword for function?", "options": ["fun", "def", "function", "define"], "answer": "def"},
            {"question": "Boolean values?", "options": ["Yes/No", "True/False", "1/0", "On/Off"], "answer": "True/False"},
            {"question": "Loop keyword?", "options": ["loop", "for", "repeat", "cycle"], "answer": "for"},
            {"question": "Python file extension?", "options": [".py", ".js", ".java", ".html"], "answer": ".py"},
            {"question": "Input function?", "options": ["read()", "scan()", "input()", "get()"], "answer": "input()"},
            {"question": "Comment symbol?", "options": ["//", "#", "/* */", "--"], "answer": "#"},
            {"question": "Indentation means?", "options": ["Spacing", "Loop", "Condition", "Error"], "answer": "Spacing"}
        ]
    },
    "html": {
        "basics": [
            {"question": "HTML stands for?", "options": ["Hyper Text Markup Language", "High Text", "Hyper Tool", "None"], "answer": "Hyper Text Markup Language"},
            {"question": "Largest heading?", "options": ["<h1>", "<h6>", "<p>", "<div>"], "answer": "<h1>"},
            {"question": "Paragraph tag?", "options": ["<p>", "<h1>", "<div>", "<span>"], "answer": "<p>"},
            {"question": "Link tag?", "options": ["<a>", "<link>", "<href>", "<url>"], "answer": "<a>"},
            {"question": "Image tag?", "options": ["<img>", "<image>", "<pic>", "<src>"], "answer": "<img>"},
            {"question": "Break line?", "options": ["<br>", "<break>", "<lb>", "<newline>"], "answer": "<br>"},
            {"question": "List tag?", "options": ["<ul>", "<li>", "<ol>", "All"], "answer": "All"},
            {"question": "Table tag?", "options": ["<table>", "<tb>", "<tr>", "<td>"], "answer": "<table>"},
            {"question": "Form tag?", "options": ["<form>", "<input>", "<button>", "<label>"], "answer": "<form>"},
            {"question": "Title tag?", "options": ["<title>", "<head>", "<meta>", "<h1>"], "answer": "<title>"}
        ]
    },
    "javascript": {
        "basics": []
    },
    "css": {
        "basics": []
    },
    "sql": {
        "basics": []
    }
}

# ✅ Get languages
@app.get("/languages")
def get_languages():
    return list(data.keys())

# ✅ Get exercises
@app.get("/exercises/{lang}")
def get_exercises(lang: str):
    return list(data.get(lang, {}).keys())

# ✅ Get quiz questions
@app.get("/quiz/{lang}/{exercise}")
def get_quiz(lang: str, exercise: str):
    return data.get(lang, {}).get(exercise, [])