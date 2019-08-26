import React, { useState, useEffect } from "react";
import echarts, { ECharts } from "echarts";
import * as tf from '@tensorflow/tfjs'
import * as tfvis from "@tensorflow/tfjs-vis"
import "./style.css";



export default () => {
  const [chart, setChart] = useState<ECharts>();

  async function getData() {
    const carsDataReq = await fetch(
      "https://storage.googleapis.com/tfjs-tutorials/carsData.json"
    );
    const carsData = await carsDataReq.json();
    const cleaned = carsData
      .map((car: any) => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower
      }))
      .filter((car: any) => car.mpg != null && car.horsepower != null);

    return cleaned;
  }


  const setOptions = async (charts: ECharts) => {
    const data = await getData();
    const values = data.map((d: any) => [d.horsepower, d.mpg]);
    charts.setOption({
      title: {
        text: "Horsepower v MPG"
      },
      xAxis: {
        name: "Horsepower"
      },
      yAxis: {
        name: "MPG"
      },
      series: [
        {
          symbolSize: 10,
          type: "scatter",
          data: values
        }
      ]
    });
    const model = createModel()
    console.log(model)
  };
  useEffect(() => {
    const initChart = echarts.init(document.getElementById(
      "main"
    ) as HTMLDivElement);
    setOptions(initChart);
    setChart(initChart);
  }, [1]);
  return (
    <div className="main" id="main">
      main
    </div>
  );
};

function createModel() {
  // Create a sequential model
  const model = tf.sequential(); 
  
  // Add a single hidden layer
  model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
  
  // Add an output layer
  model.add(tf.layers.dense({units: 1, useBias: true}));

  return model;
}