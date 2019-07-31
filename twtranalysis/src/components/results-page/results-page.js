import React, { Component } from "react";
import "./results-page.css";
import Nav from "../Navbar/Nav";
import MyResponsiveLine from "../Graphs/line-plot/line-plot";
import PieChart from "../Graphs/pie-chart/pie-chart";
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
      neg_count: [
        {
          count: 59,
          time: "Wed, 31 Jul 2019 12:00:00 GMT"
        },
        {
          count: 55,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 53,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 44,
          time: "Wed, 31 Jul 2019 11:45:00 GMT"
        },
        {
          count: 39,
          time: "Wed, 31 Jul 2019 11:30:00 GMT"
        },
        {
          count: 39,
          time: "Wed, 31 Jul 2019 12:15:00 GMT"
        },
        {
          count: 36,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        }
      ],
      pos_count: [
        {
          count: 119,
          time: "Wed, 31 Jul 2019 12:15:00 GMT"
        },
        {
          count: 112,
          time: "Wed, 31 Jul 2019 12:00:00 GMT"
        },
        {
          count: 101,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 91,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 89,
          time: "Wed, 31 Jul 2019 11:45:00 GMT"
        },
        {
          count: 68,
          time: "Wed, 31 Jul 2019 11:30:00 GMT"
        },
        {
          count: 60,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        }
      ],
      retweets: 576,
      time_count: [
        {
          count: 171,
          time: "Wed, 31 Jul 2019 12:00:00 GMT"
        },
        {
          count: 158,
          time: "Wed, 31 Jul 2019 12:15:00 GMT"
        },
        {
          count: 154,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 146,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 133,
          time: "Wed, 31 Jul 2019 11:45:00 GMT"
        },
        {
          count: 107,
          time: "Wed, 31 Jul 2019 11:30:00 GMT"
        },
        {
          count: 96,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        }
      ],
      total_count: 965
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
    let totalTweets = [];
    let posTweets = [];
    let negTweets = [];

    response.data.time_count = response.data.time_count.sort((a, b) => {
      a = moment(a.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      b = moment(b.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      return a < b ? -1 : a > b ? 1 : 0;
    });

    response.data.pos_count = response.data.pos_count.sort((a, b) => {
      a = moment(a.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      b = moment(b.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      return a < b ? -1 : a > b ? 1 : 0;
    });

    response.data.neg_count = response.data.neg_count.sort((a, b) => {
      a = moment(a.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      b = moment(b.time, "ddd, DD MMM YYYY HH:mm:ss").toDate();
      return a < b ? -1 : a > b ? 1 : 0;
    });

    response.data.time_count.forEach(tweet => {
      labels.push(moment(tweet.time).toDate());
      totalTweets.push(tweet.count);
    });

    response.data.pos_count.forEach(tweet => {
      posTweets.push(tweet.count);
    });
    response.data.neg_count.forEach(tweet => {
      negTweets.push(tweet.count);
    });

    this.setState({
      total_count: response.data.total_count,
      retweets: response.data.retweets,
      linePlotData: {
        labels: labels,
        totalTweets: totalTweets,
        posTweets: posTweets,
        negTweets: negTweets
      }
    });
  };

  render() {
    let resultsPage = (
      <div className="Spinner">
        <Spinner />
      </div>
    );
    if (this.state.total_count) {
      resultsPage = (
        <div className="results-page">
          <div className="results-header">
            <Nav hashtag={this.state.hashtag} />
            <div className="linePlotContainer">
              <MyResponsiveLine linePlotData={this.state.linePlotData} />
            </div>
          </div>
          <div className="tweetCount">
            <div className="middle-align">
              <h4>Number of Users Tweeting</h4>
              <h1>{this.state.total_count}</h1>
            </div>
          </div>
          <div className="pieCharts">
            <div className="pieChart">
              <h4>Activity Ratio</h4>
              <PieChart
                totalCount={this.state.total_count}
                retweets={this.state.retweets}
              />
            </div>
            <div className="pieChart">
              <h4>Activity Ratio</h4>
              <PieChart
                totalCount={this.state.total_count}
                retweets={this.state.retweets}
              />
            </div>
          </div>
        </div>
      );
    }

    return <div className="result-wrapper">{resultsPage}</div>;
  }
}
export default ResultsPage;
