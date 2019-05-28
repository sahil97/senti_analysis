import React, { Component } from "react";
import styles from "./LinePlot.module.css";
import Plot from "react-plotly.js";

class LinePlot extends Component {
  layout = {
    title: {
      text: "All the free tweets I could get...",
      font: {
        family: "Courier New, monospace",
        size: 24
      },
      xref: "paper",
      x: 0.05
    },
    margin: {
      b: 200
    },
    xaxis: {
      tiReacttle: {
        text: "Time",
        font: {
          family: "Courier New, monospace",
          size: 18,
          automargin: true,
          color: "#7f7f7f"
        }
      },
      automargin: true
    },
    yaxis: {
      title: {
        text: "Tweet Count",
        font: {
          family: "Courier New, monospace",
          size: 18,
          color: "#7f7f7f"
        }
      }
    },
    width: 0.8 * window.innerWidth
  };

  state = {
    positive: null,
    negative: null
  };

  processData = () => {
    let neg = this.props.data["Negative"];
    let pos = this.props.data["positive"];

    let negative = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: "Negative"
    };

    let positive = {
      x: [],
      y: [],
      mode: "lines+markers",
      name: "Positive"
    };

    for (let i = 0; i < neg.length; i++) {
      negative["x"].push(neg[i]["time"]);
      negative["y"].push(neg[i]["tweet"]);
    }

    for (let i = 0; i < pos.length; i++) {
      positive["x"].push(pos[i]["time"]);
      positive["y"].push(pos[i]["tweet"]);
    }

    console.log(negative);
    console.log(positive);
    this.setState({ positive: positive, negative: negative });
  };

  componentDidMount() {
    this.processData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.processData();
    }
  }

  render() {
    return (
      <Plot
        className={styles.LinePlot}
        data={[this.state.positive, this.state.negative]}
        layout={this.layout}
      />
    );
  }
}

export default LinePlot;
