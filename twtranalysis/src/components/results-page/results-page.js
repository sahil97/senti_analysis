import React, { Component } from "react";
import "./results-page.css";
import Nav from "../Navbar/Nav";
import MyResponsiveLine from "../Graphs/line-plot/line-plot";
import Aux from "../../HOC/Aux/Aux";

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
    return (
      <Aux>
        <Nav hashtag={this.state.hashtag} />
        <div className="linePlotContainer">
          <MyResponsiveLine />
        </div>
      </Aux>
    );
  }
}
export default ResultsPage;
