import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import pallete from "google-palette";

class LinePlot extends Component {
  colors = pallete("cb-Dark2", 2).map(hex => {
    return "#" + hex;
  });
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "top",
      labels: {
        boxWidth: 50,
        fontColor: "black"
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent"
          },
          type: "time",
          time: {
            unit: "hours",
            unitStepSize: 0.25,
            round: "minutes",
            tooltipFormat: "h:mm a",
            displayFormats: { hours: "h:mm a" }
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Tweet Count",
            fontColor: "white"
          }
        }
      ]
    }
  };

  render() {
    let speedData = {
      labels: this.props.linePlotData.labels,
      datasets: [
        {
          label: "Total Tweets",
          data: this.props.linePlotData.totalTweets,
          lineTension: 0.1,
          backgroundColor: "transparent",
          borderColor: "white",
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 10,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: "rectRounded"
        },
        {
          label: "Positive",
          data: this.props.linePlotData.posTweets,
          lineTension: 0.1,
          backgroundColor: "transparent",
          borderColor: this.colors[0],
          pointRadius: 5,
          pointHoverRadius: 10,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: "rectRounded"
        },
        {
          label: "Negative",
          data: this.props.linePlotData.negTweets,
          lineTension: 0.1,
          backgroundColor: "transparent",
          borderColor: this.colors[1],
          pointRadius: 5,
          pointHoverRadius: 10,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: "rectRounded"
        }
      ]
    };

    return (
      <div>
        <Line data={speedData} options={this.chartOptions} height={400} />
      </div>
    );
  }
}

export default LinePlot;
