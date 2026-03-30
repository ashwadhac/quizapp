import { useEffect, useState } from "react";
import { getLanguages } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

function Home() {
  const [langs, setLangs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLanguages()
      .then((res) => {
        console.log("DATA:", res.data); // debug
        setLangs(res.data);
      })
      .catch((err) => {
        console.error("ERROR:", err); // debug
      });
  }, []);

  return (
    <div>
      <h1>🚀 Quiz App</h1>
      <h3>Select Language</h3>

      {langs.length === 0 ? (
        <p>Loading...</p>
      ) : (
        langs.map((lang, i) => (
          <div
            className="card"
            key={i}
            onClick={() => navigate(`/quiz/${lang}`)}
            style={{ cursor: "pointer" }}
          >
            <h3>{lang.toUpperCase()}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;