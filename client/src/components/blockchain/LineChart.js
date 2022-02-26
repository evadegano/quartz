
import { Component } from "react";
import { Line } from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);



class LineChart extends Component {
  setOptions = () => {

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            color: "white",
            font: {
              family: "'IBM Plex Mono', 'monospace'"
            }
          },
          grid: {
            color: "#333333",
            borderDash: [5]
          }
        },
        y: {
          ticks: {
            color: "white",
            font: {
              size: 10,
              family: "'IBM Plex Mono', 'monospace'"
            }
          },
          grid: {
            color: "#333333",
            borderDash: [5]
          }
        }
      }
    };
    
    return options;
  };

  setData = () => {
    // labels defined by props
    const labels = ['January', 'February', 'March'];
  
    const data = {
      labels,
      datasets: [
        {
          label: "Transactions",
          data: [150000, 70000, 200000],
          borderColor: "#FE6601",
          backgroundColor: "#222222",
          fill: true,
          tension: 0.4
        },
      ],
    };

    return data;
  };
  
  render() {
    const options = this.setOptions();
    const data = this.setData();

    return (
      <div className="chart">
        <Line data={data} options={options}/>
      </div>
    );
  }
}


export default LineChart;