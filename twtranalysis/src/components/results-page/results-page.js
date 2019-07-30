import React, { Component } from "react";
import "./results-page.css";
import Nav from "../Navbar/Nav";
import MyResponsiveLine from "../Graphs/line-plot/line-plot";
import Aux from "../../HOC/Aux/Aux";
import axios from "../../axios";
import moment from "moment";
import Spinner from "../Spinner/Spinner";

class ResultsPage extends Component {
  state = {
    hashtag: "",
    retweets: 0,
    total_count: 0,
    linePlotData: {}
  };

  response = {
    data: {
      retweets: 586,
      time_count: [
        { count: 189, time: "Tue, 30 Jul 2019 11:15:00 GMT" },
        { count: 171, time: "Tue, 30 Jul 2019 11:45:00 GMT" },
        { count: 170, time: "Tue, 30 Jul 2019 12:00:00 GMT" },
        { count: 166, time: "Tue, 30 Jul 2019 12:15:00 GMT" },
        { count: 154, time: "Tue, 30 Jul 2019 11:30:00 GMT" },
        { count: 103, time: "Tue, 30 Jul 2019 11:00:00 GMT" },
        { count: 33, time: "Tue, 30 Jul 2019 12:30:00 GMT" }
      ],
      length: 7,
      total_count: 986
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);
    for (let param of query.entries()) {
      this.setState({ hashtag: param[1] });
    }

    // axios
    //   .post("", {
    //     hashtag: "India"
    //   })
    //   .then(res => console.log("res", res));

    setTimeout(() => {
      this.showTweets(this.response);
    }, 3000);
  }

  showTweets = response => {
    let labels = [];
    let plotData = [];

    response.data.time_count = response.data.time_count.sort((a, b) => {
      a = moment(a.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      b = moment(b.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      return a < b ? -1 : a > b ? 1 : 0;
    });

    response.data.time_count.forEach(tweet => {
      labels.push(moment(tweet.time).toDate());
      plotData.push(tweet.count);
    });

    this.setState({
      total_count: response.data.total_count,
      retweets: response.data.retweets,
      linePlotData: {
        labels: labels,
        plotData: plotData
      }
    });
  };

  render() {
    let linePlotContainer = (
      <div className="Spinner">
        <Spinner />
      </div>
    );
    if (this.state.total_count) {
      linePlotContainer = (
        <Aux>
          <Nav hashtag={this.state.hashtag} />
          <div className="linePlotContainer">
            <MyResponsiveLine linePlotData={this.state.linePlotData} />
          </div>
        </Aux>
      );
    }

    return <Aux>{linePlotContainer}</Aux>;
  }
}
export default ResultsPage;
