import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import pallete from "google-palette";
class LinePlot extends Component {
  hoursEarlier = hours => {
    return moment()
      .subtract(hours, "h")
      .toDate();
  };

  colors = pallete("cb-Dark2", 2).map(hex => {
    return "#" + hex;
  });

  speedData = {
    labels: [
      this.hoursEarlier(10),
      this.hoursEarlier(9.4),
      this.hoursEarlier(8),
      this.hoursEarlier(7),
      this.hoursEarlier(6),
      this.hoursEarlier(5),
      this.hoursEarlier(4)
    ],
    datasets: [
      {
        label: "Positive",
        data: [0, 59, 75, 20, 20, 55, 40],
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
        data: [1, 29, 73, 10, 50, 25, 10],
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

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "top",
      labels: {
        boxWidth: 80,
        fontColor: "black"
      }
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "hour",
            unitStepSize: 1.5,
            round: "hour",
            tooltipFormat: "h:mm:ss a",
            displayFormats: {
              hour: "h:mm A"
            }
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
    return (
      <div>
        <Line data={this.speedData} options={this.chartOptions} height={400} />
      </div>
    );
  }
}

export default LinePlot;
