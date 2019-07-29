import React, { Component } from "react";
import Nav from "../Navbar/Nav";

class ResultsPage extends Component {
  state = {
    hashtag: "",
    retweets: 0,
    tweet_count: {},
    total_count: 0
  };
  render() {
    return <Nav />;
  }
}
export default ResultsPage;
