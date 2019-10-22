import axios from "axios";

const instance = axios.create({
  baseURL: "https://twt.sahilsharma.me/api/tweets_analysis"
  // baseURL: "http://localhost:5000/api/tweets_analysis"
});

export default instance;