import axios from "axios";

const api = axios.create({
  baseURL: "https://core-dashboard.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;