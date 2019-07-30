import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/tweets_analysis"
});

export default instance;
