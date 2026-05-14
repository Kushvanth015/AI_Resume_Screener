import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-screener-uhow.onrender.com",
});

export default API;