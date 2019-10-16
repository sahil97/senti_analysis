import React, {
  Component
} from "react";
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
    linePlotData: {},
    posTweets: 0,
    negTweets: 0
  };

  tempResponse = {
    data: {
      neg_count: [{
          count: 58,
          time: "Wed, 31 Jul 2019 13:30:00 GMT"
        },
        {
          count: 58,
          time: "Wed, 31 Jul 2019 13:15:00 GMT"
        },
        {
          count: 56,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        },
        {
          count: 53,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 48,
          time: "Wed, 31 Jul 2019 13:45:00 GMT"
        },
        {
          count: 45,
          time: "Wed, 31 Jul 2019 14:00:00 GMT"
        },
        {
          count: 26,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 1,
          time: "Wed, 31 Jul 2019 14:15:00 GMT"
        }
      ],
      neg_tweets: 345,
      pos_count: [{
          count: 117,
          time: "Wed, 31 Jul 2019 13:30:00 GMT"
        },
        {
          count: 111,
          time: "Wed, 31 Jul 2019 13:15:00 GMT"
        },
        {
          count: 101,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 96,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        },
        {
          count: 95,
          time: "Wed, 31 Jul 2019 14:00:00 GMT"
        },
        {
          count: 80,
          time: "Wed, 31 Jul 2019 13:45:00 GMT"
        },
        {
          count: 33,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 6,
          time: "Wed, 31 Jul 2019 14:15:00 GMT"
        }
      ],
      pos_tweets: 639,
      retweets: 598,
      time_count: [{
          count: 175,
          time: "Wed, 31 Jul 2019 13:30:00 GMT"
        },
        {
          count: 169,
          time: "Wed, 31 Jul 2019 13:15:00 GMT"
        },
        {
          count: 154,
          time: "Wed, 31 Jul 2019 12:45:00 GMT"
        },
        {
          count: 152,
          time: "Wed, 31 Jul 2019 13:00:00 GMT"
        },
        {
          count: 140,
          time: "Wed, 31 Jul 2019 14:00:00 GMT"
        },
        {
          count: 128,
          time: "Wed, 31 Jul 2019 13:45:00 GMT"
        },
        {
          count: 59,
          time: "Wed, 31 Jul 2019 12:30:00 GMT"
        },
        {
          count: 7,
          time: "Wed, 31 Jul 2019 14:15:00 GMT"
        }
      ],
      total_count: 984
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(window.location.search);

    for (let param of query.entries()) {
      this.setState({
        hashtag: param[1]
      }, () => {
        let params = {
          hashtag: this.state.hashtag
        };

        console.log(params);
        axios
          .post("", params)
          .then(res => {
            console.log("res", res);
            this.showTweets(res);
          })
          .catch(err => {
            console.log("Couldn't fetch, showing sample tweets");
            this.showTweets(this.tempResponse);
          });
      });
    };
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
      posTweetsCount: response.data.pos_tweets,
      negTweetsCount: response.data.neg_tweets,
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
              <h4>Sentiment Ratio</h4>
              <PieChart
                categories={["Positive", "Negative"]}
                colors={["#57FAC7", "#FF3B55"]}
                counts={[this.state.posTweetsCount, this.state.negTweetsCount]}
              />
            </div>
            <div className="pieChart">
              <h4>Activity Ratio</h4>
              <PieChart
                categories={["Orignial", "Retweets"]}
                colors={["#04DFE8", "white"]}
                counts={[
                  this.state.total_count - this.state.retweets,
                  this.state.retweets
                ]}
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