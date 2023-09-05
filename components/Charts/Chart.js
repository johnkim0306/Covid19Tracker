import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
import numeral from "numeral";
import './chart.scss'
import moment from 'moment';
import 'chartjs-adapter-moment';
// import {ArcElement,Chart} from 'chart.js'

// Chart.register(ArcElement, Line, Pie)


import { Chart, LineElement, PieController, ArcElement, CategoryScale, registerables } from "chart.js";
// import { Line, Pie } from "react-chartjs-2";

Chart.register(LineElement, PieController, ArcElement, CategoryScale, ...registerables);

const options = {
    legend: {
      display: true,
      labels: {
        color: 'rgb(255, 99, 132)'
    }
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
      x: {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
      },
      y: {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
      },
    },
    height: 500
  };

let style = {
  position: "relative",
  width:"100%",
  height:"50vh"
}

const Charts = ({ casesType = "cases", cases, recovered, deaths } ) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      const { data } = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=160"
      );

      let chartData = buildChartData(data, casesType);
      setData(chartData);
    };

    getCountriesData();
  }, [casesType]);

  const buildChartData = (data, casesType) => {
    let chartData = [];
    for (let date in data[casesType]) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date],
          z: data.deaths[date]
        };
        chartData.push(newDataPoint);
    }
    return chartData;
  };

  const lineChart = (
    data.length &&
    <Line
      data={{
        labels: data.map(({x}) => x),
        datasets: [
          {
            label: "Infected",
            data: data.map(({y}) => y),
            borderColor: "#3333ff",
            fill: true,
          }, 
          {
            label: 'Deaths',
            data: data.map(({z}) => z),
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
        ],
      }}
      options={options}
    />
  );

  const PieChart = (
    cases ? 
      <Pie
        data={{
            labels: [
                'Deaths',
                'recovered',
                'cases'
              ],
            datasets: [{
            data: [deaths, recovered, cases],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          },
          ],
        }}
        style={style}
        width={1000}
        height={300}
      /> : "API request you are trying to make is no longer supported by the API provider and can no longer be used."
  );

  return (
    <div className="container chart__container ">
      <div style={style} className="container__piechart">
        <h3>Today's Case</h3>
        {PieChart} 
      </div>
      <div style={style} className="container__linechart">
        <h3>Total cases</h3>
        {lineChart}
      </div>
    </div>
  );
};

export default Charts;
