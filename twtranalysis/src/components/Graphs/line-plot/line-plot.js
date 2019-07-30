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
          gridLines: {
            color: "black",
            borderDash: [2, 5]
          },
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
          data: this.props.linePlotData.plotData,
          lineTension: 0.1,
          backgroundColor: "transparent",
          borderColor: "white",
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 10,
          pointHitRadius: 30,
          pointBorderWidth: 2,
          pointStyle: "rectRounded"
        }
        // {
        //   label: "Negative",
        //   data: [1, 29, 73, 10, 50, 25, 10],
        //   lineTension: 0.1,
        //   backgroundColor: "transparent",
        //   borderColor: this.colors[1],
        //   pointRadius: 5,
        //   pointHoverRadius: 10,
        //   pointHitRadius: 30,
        //   pointBorderWidth: 2,
        //   pointStyle: "rectRounded"
        // }
      ]
    };

    let LinePlot = <h1>Loading</h1>;

    if (this.props.linePlotData.labels) {
      LinePlot = (
        <Line data={speedData} options={this.chartOptions} height={400} />
      );
    }

    return <div>{LinePlot}</div>;
  }
}

export default LinePlot;
