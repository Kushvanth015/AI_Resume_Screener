import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-url.up.railway.app",
});

export default API;