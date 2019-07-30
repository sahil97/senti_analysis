import { ResponsiveLine } from "@nivo/line";
import React from "react";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    id: "fake corp. A",
    data: [
      { x: "2018-01-01", y: 7 },
      { x: "2018-01-02", y: 5 },
      { x: "2018-01-03", y: 11 },
      { x: "2018-01-04", y: 9 },
      { x: "2018-01-05", y: 12 },
      { x: "2018-01-06", y: 16 },
      { x: "2018-01-07", y: 13 },
      { x: "2018-01-08", y: 13 }
    ]
  },
  {
    id: "fake corp. B",
    data: [
      { x: "2018-01-04", y: 14 },
      { x: "2018-01-05", y: 14 },
      { x: "2018-01-06", y: 15 },
      { x: "2018-01-07", y: 11 },
      { x: "2018-01-08", y: 10 },
      { x: "2018-01-09", y: 12 },
      { x: "2018-01-10", y: 9 },
      { x: "2018-01-11", y: 7 }
    ]
  }
];

const MyResponsiveLine = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      precision: "day"
    }}
    xFormat="time:%Y-%m-%d"
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto"
    }}
    axisTop={null}
    axisRight={null}
    axisLeft={{
      legend: "linear scale",
      legendOffset: 12
    }}
    axisBottom={{
      format: "%b %d",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: "every 2 days",
      legend: "time scale",
      legendOffset: -12,
      legendPosition: "middle"
    }}
    colors={{ scheme: "nivo" }}
    pointSize={10}
    enablePointLabel={true}
    pointBorderWidth={1}
    pointBorderColor={{
      from: "color",
      modifiers: [["darker", 0.3]]
    }}
    useMesh={true}
    enableSlices={false}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

export default MyResponsiveLine;
