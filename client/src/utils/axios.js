// dependencies
import axios from "axios";

// creating axios instance
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true
});
