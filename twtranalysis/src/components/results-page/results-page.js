import React, { Component } from "react";
import Nav from "../Navbar/Nav";

class ResultsPage extends Component {
  state = {
    hashtag: "",
    retweets: 0,
    tweet_count: {},
    total_count: 0
  };

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    for (let param of query.entries()) {
      this.setState({ hashtag: param[1] });
    }
  }

  render() {
    return <Nav hashtag={this.state.hashtag} />;
  }
}
export default ResultsPage;
