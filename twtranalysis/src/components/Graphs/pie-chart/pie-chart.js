import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends Component {
  data = {
    datasets: [
      {
        data: [
          this.props.retweets,
          this.props.totalCount - this.props.retweets
        ],
        backgroundColor: ["white", "#2A729D"]
        // These labels appear in the legend and in the tooltips when hovering different arcs
      }
    ],
    labels: ["Retweets", "Original"]
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
