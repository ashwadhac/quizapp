import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuiz } from "../services/api";
import "../styles/main.css";

function Quiz() {
  const { lang } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getQuiz(lang).then(res => setQuestions(res.data));
  }, [lang]);

  const handleAnswer = (opt) => {
    setSelected(opt);
    if (opt === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const next = () => {
    setSelected(null);
    setCurrent(current + 1);
  };

  if (!questions.length) return <h2>Loading...</h2>;

  const q = questions[current];

  return (
    <div className="card">
      <h2>{q.question}</h2>

      {q.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{
            backgroundColor:
              selected === opt
                ? opt === q.answer ? "green" : "red"
                : "#eee"
          }}
        >
          {opt}
        </button>
      ))}

      {selected && (
        <>
          <p>
            {selected === q.answer
              ? "🔥 Correct!"
              : "💪 Try next!"}
          </p>

          {current < questions.length - 1 ? (
            <button onClick={next}>Next</button>
          ) : (
            <button onClick={() =>
              navigate("/result", {
                state: { score, total: questions.length }
              })
            }>
              Submit
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz;