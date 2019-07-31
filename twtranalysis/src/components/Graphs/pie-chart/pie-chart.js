import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends Component {
  data = {
    datasets: [
      {
        data: this.props.counts,
        backgroundColor: this.props.colors
        // These labels appear in the legend and in the tooltips when hovering different arcs
      }
    ],
    labels: this.props.categories
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: this.props.cutoutPercentage
      ? this.props.cutoutPercentage
      : 80
  };

  render() {
    return (
      <Doughnut data={this.data} height={150} options={this.chartOptions} />
    );
  }
}
export default DoughnutChart;
