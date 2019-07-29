import React, { Component } from "react";
import "./main-wrapper.css";

class MainWrapper extends Component {
  state = {
    hashtag: ""
  };

  handleTextChange = event => {
    if (this.state.hashtag.length > 0) {
      this.setState({ hashtag: event.target.value });
    } else {
      this.setState({
        hashtag: "# " + event.target.value
      });
    }
  };

  render() {
    return (
      <div className="main-wrapper">
        <div className="twitter-logo">
          <img
            className="img-responsive"
            src="/twtr.png"
            alt="Twitter-Logo"
          ></img>
        </div>
        <div className="wrapper">
          <div className="text-block">
            <h1>NLP analysis of Tweets</h1>
            <p> Built using React, D3, Tensorflow, Flask.</p>
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              maxLength="25"
              id="Hashtag"
              className="form-control form-control-lg"
              placeholder="type #Hashtag to search"
              value={this.state.hashtag}
              onChange={this.handleTextChange.bind(this)}
            />
            <div className="search"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainWrapper;
