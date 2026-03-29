import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [languages, setLanguages] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [lang, setLang] = useState("");
  const [exercise, setExercise] = useState("");

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showNext, setShowNext] = useState(false);

  const messages = [
    "Don't worry! Try next 💪",
    "Keep going 🔥",
    "You can do it 🚀",
    "Almost there 😎"
  ];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/languages")
      .then(res => res.json())
      .then(data => setLanguages(data));
  }, []);

  const loadExercises = (l) => {
    setLang(l);
    fetch(`http://127.0.0.1:8000/exercises/${l}`)
      .then(res => res.json())
      .then(data => {
        setExercises(data);
        setPage("exercise");
      });
  };

  const startQuiz = (ex) => {
    setExercise(ex);
    fetch(`http://127.0.0.1:8000/quiz/${lang}/${ex}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setPage("quiz");
      });
  };

  const answer = (opt) => {
    setSelected(opt);
    setShowNext(true);

    if (opt === questions[index].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowNext(false);
    setIndex(index + 1);
  };

  if (page === "home") {
    return (
      <div className="container">
        <h1>Quiz App</h1>
        <button onClick={() => setPage("lang")}>Get Started</button>
      </div>
    );
  }

  if (page === "lang") {
    return (
      <div className="container">
        <h2>Select Language</h2>
        {languages.map((l, i) => (
          <button key={i} onClick={() => loadExercises(l)}>
            {l}
          </button>
        ))}
      </div>
    );
  }

  if (page === "exercise") {
    return (
      <div className="container">
        <h2>Select Exercise</h2>
        {exercises.map((ex, i) => (
          <button key={i} onClick={() => startQuiz(ex)}>
            {ex}
          </button>
        ))}
      </div>
    );
  }

  if (index >= questions.length) {
    return (
      <div className="container">
        <h2>🎉 Quiz Finished</h2>
        <h3>Score: {score}/{questions.length}</h3>
        <button onClick={() => window.location.reload()}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Question {index + 1} / {questions.length}</h3>
      <p>{questions[index]?.question}</p>

      {questions[index]?.options.map((opt, i) => (
        <button
          key={i}
          className={
            selected
              ? opt === questions[index].answer
                ? "correct"
                : opt === selected
                ? "wrong"
                : ""
              : ""
          }
          onClick={() => answer(opt)}
          disabled={selected}
        >
          {opt}
        </button>
      ))}

      {selected &&
        selected !== questions[index].answer && (
          <p className="msg">
            {messages[Math.floor(Math.random() * messages.length)]}
          </p>
        )}

      {showNext && (
        <button onClick={nextQuestion}>Next</button>
      )}
    </div>
  );
}

export default App;