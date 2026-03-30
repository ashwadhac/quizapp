import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const getLanguages = () => API.get("/languages");
export const getQuiz = (lang) => API.get(`/quiz/${lang}`);