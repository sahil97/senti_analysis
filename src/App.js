import React, { Component } from "react";
import Container from "./Containers/Container/Container";
import Toolbar from "./Components/Toolbar/Toolbar";
import TextInput from "./Components/TextInput/TextInput";
import PopList from "./Components/PopList/PopList";
import LinePlot from "./Components/LinePlot/LinePlot";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    Hashtag: "",
    searched: false,
    // LinePlotData: null
    LinePlotData: {
      Negative: [
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:20:00 GMT",
          tweet: 5
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:25:00 GMT",
          tweet: 42
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:30:00 GMT",
          tweet: 16
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:35:00 GMT",
          tweet: 22
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:40:00 GMT",
          tweet: 44
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:45:00 GMT",
          tweet: 24
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 11:50:00 GMT",
          tweet: 10
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:00:00 GMT",
          tweet: 6
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:05:00 GMT",
          tweet: 34
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:10:00 GMT",
          tweet: 32
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:15:00 GMT",
          tweet: 44
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:20:00 GMT",
          tweet: 22
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:25:00 GMT",
          tweet: 36
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:30:00 GMT",
          tweet: 32
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:35:00 GMT",
          tweet: 32
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:40:00 GMT",
          tweet: 50
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:45:00 GMT",
          tweet: 38
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 12:50:00 GMT",
          tweet: 12
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:00:00 GMT",
          tweet: 14
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:05:00 GMT",
          tweet: 16
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:10:00 GMT",
          tweet: 34
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:15:00 GMT",
          tweet: 30
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:20:00 GMT",
          tweet: 22
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:25:00 GMT",
          tweet: 26
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:30:00 GMT",
          tweet: 26
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:35:00 GMT",
          tweet: 14
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:40:00 GMT",
          tweet: 14
        },
        {
          inf: 0,
          time: "Mon, 27 May 2019 13:45:00 GMT",
          tweet: 2
        }
      ],
      positive: [
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:25:00 GMT",
          tweet: 70
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:30:00 GMT",
          tweet: 54
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:35:00 GMT",
          tweet: 52
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:40:00 GMT",
          tweet: 54
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:45:00 GMT",
          tweet: 50
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 11:50:00 GMT",
          tweet: 20
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:00:00 GMT",
          tweet: 30
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:05:00 GMT",
          tweet: 40
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:10:00 GMT",
          tweet: 36
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:15:00 GMT",
          tweet: 72
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:20:00 GMT",
          tweet: 54
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:25:00 GMT",
          tweet: 42
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:30:00 GMT",
          tweet: 48
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:35:00 GMT",
          tweet: 36
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:40:00 GMT",
          tweet: 60
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:45:00 GMT",
          tweet: 78
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 12:50:00 GMT",
          tweet: 26
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:00:00 GMT",
          tweet: 24
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:05:00 GMT",
          tweet: 58
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:10:00 GMT",
          tweet: 42
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:15:00 GMT",
          tweet: 74
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:20:00 GMT",
          tweet: 56
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:25:00 GMT",
          tweet: 66
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:30:00 GMT",
          tweet: 34
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:35:00 GMT",
          tweet: 44
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:40:00 GMT",
          tweet: 52
        },
        {
          inf: 4,
          time: "Mon, 27 May 2019 13:45:00 GMT",
          tweet: 7
        }
      ]
    }
  };

  listItemClicked = event => {
    this.setState({ Hashtag: event.target.innerText });
    this.getTweets(event.target.innerText);
  };

  getTweets = hashtag => {
    axios({
      method: "post",
      url: "https://sentiianalysis.herokuapp.com/api/v0.1/tweets",
      data: {
        hashtag: hashtag,
        count: 2
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          LinePlotData: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      if (event.target.value) {
        console.log(event.target.value);
        this.setState({ Hashtag: event.target.value });
        this.getTweets(event.target.value);
      } else {
        alert("Enter some text");
      }
    }
  };

  render() {
    return (
      <div className="App">
        <Toolbar />
        <Container>
          {this.state.Hashtag ? (
            <div>
              <h1>{this.state.Hashtag}</h1>
              <TextInput onKeyDown={event => this.handleKeyPress(event)} />
            </div>
          ) : (
            <div>
              <h1> Enter a Hashtag for analysis of their tweets</h1>
              <TextInput onKeyDown={event => this.handleKeyPress(event)} />
              <h2>Popular</h2>
              <PopList clicked={event => this.listItemClicked(event)} />
            </div>
          )}
          {this.state.LinePlotData ? (
            <LinePlot data={this.state.LinePlotData} />
          ) : null}
        </Container>
      </div>
    );
  }
}

export default App;
