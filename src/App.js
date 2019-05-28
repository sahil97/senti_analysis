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
    LinePlotData: null
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
