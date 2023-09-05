"use client";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    x: 
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    y: 
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;

  let dates = 'timeline' in data ? data.timeline[casesType] : data[casesType];

  for (let date in dates) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: dates[date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = dates[date];
  }

  return chartData;
};


const GraphCanada = ({ casesType, countryName }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/historical/canada?lastdays=120");
        const jsonData = await response.json();
        let chartData = buildChartData(jsonData, casesType);
        setData(chartData);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {error ? (
          <div>An error occurred while fetching the data: {error.message}</div>
        ) : data?.length > 0 ? (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  data
                },
              ],
            }}
            options={options}
          />
        ) : (
          <div>Loading...</div>
        )}
    </div>
  );
}

export default GraphCanada;
