import axios from "axios";

const instance = axios.create({
  baseURL: "http://68.183.80.141:5000/api/tweets_analysis"
  // baseURL: "http://localhost:5000/api/tweets_analysis"
});

export default instance;