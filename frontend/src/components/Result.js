import { useLocation, useNavigate } from "react-router-dom";
import "../styles/main.css";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="card">
      <h1>🎉 Your Score</h1>
      <h2>{state.score} / {state.total}</h2>

      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Result;