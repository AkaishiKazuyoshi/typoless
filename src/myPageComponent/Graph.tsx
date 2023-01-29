import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "../css/myPageCss/myPage.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
//import console from "console";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC = () => {

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "対戦記録",
  //     },
  //   },
  // };

 const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "対戦記録",
      },
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         min: 0,
    //         max: 100,
    //       }
    //     }
    //   ]
    // }
  };

  //const labels = [ "1", "2", "3", "4", "5", "6", "7", ];
  const labels = ["0"];
  const template = {
    labels,
    datasets: [
      {
        label: "",
        //data: [0, 0, 0, 0, 0, 0, 0],
        data: [0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const [graphData, setGraphData] = useState(template);

  function procData() {

    const userName = localStorage.getItem("name");

    // mock for test
    // axios.get(`dummyData/dummy4.json`).then((res: AxiosResponse) => {

    axios.get(`/get/scoreHistory/${userName}`).then((res: AxiosResponse) => {

      const numOfMax = 30;

      let dtBuff = "";
      let index = numOfMax < res.data.length ? res.data.length - numOfMax : 0;
      let numOfDisp = res.data.length < numOfMax ? res.data.length : numOfMax;

      for (let i = 0; i < numOfDisp; i++) {
        template.datasets[0].data[i] = res.data[index].score;
        dtBuff = String(res.data[index].timestamp);
        labels[i] = dtBuff.slice(0, 10);
        index++;
      }

      // *** React Hook ***
      setGraphData(Object.assign({}, graphData));
    });
  }

  useEffect(() => {
    procData();
  }, []);

  return (
    <>
      <Line className="graph" options={options} data={graphData} />
    </>
  );
};

export default Graph;

/* EOF */