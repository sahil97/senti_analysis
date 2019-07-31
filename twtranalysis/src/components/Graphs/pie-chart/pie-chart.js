import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import pallete from "google-palette";

class DoughnutChart extends Component {
  data = {
    datasets: [
      {
        data: [10, 20],
        backgroundColor: ["white", "#2A729D"]
        // These labels appear in the legend and in the tooltips when hovering different arcs
      }
    ],
    labels: ["Original", "Retweets"]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80
  };

  render() {
    return (
      <Doughnut data={this.data} height={150} options={this.chartOptions} />
    );
  }
}
export default DoughnutChart;
