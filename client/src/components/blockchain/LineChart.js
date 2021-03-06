
import { Component } from "react";
import { Line } from "react-chartjs-2";
import DateTime from 'luxon/src/datetime.js'


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
    let labels = [];
    let values = [];

    // agreggate transaction amounts per day for the last 7 days
    if (this.props.timePeriod === "day") {

      for (let i = 7; i > 0; i--) {
        const day = new Date( Date.now() );
        day.setDate( day.getDate() - i );
        day.setHours(0, 0, 0, 0);

        const nextDay = new Date();
        nextDay.setDate( day.getDate() + 1 );
        nextDay.setHours(0, 0, 0, 0);

        const value = this.props.transactions
                      .filter(tx => tx.timestamps >= day.getTime() && tx.timestamps < nextDay.getTime())
                      .reduce((acc, tx) => acc + Number(tx.amount), 0)

        let dateLabel = day.toDateString().split(" ").slice(0, 3).join(" ");
        
        labels.push(dateLabel);
        values.push(value);
      }
    }

    // agreggate transaction amounts per week for the last 4 weeks
    if (this.props.timePeriod === "week") {
      const today = new Date();

      for (let i = 4; i > 0; i--) {
        const prevMonday = new Date();

        prevMonday.setDate( today.getDate() - ((today.getDay() + 6) % 7) - 7 * i );
        prevMonday.setHours(0, 0, 0, 0);

        const nextMonday = new Date();
        nextMonday.setDate( today.getDate() - ((today.getDay() + 6) % 7) - 7 * ( i - 1 ) );
        nextMonday.setHours(0, 0, 0, 0);

        const value = this.props.transactions
                      .filter(tx => tx.timestamps >= prevMonday.getTime() && tx.timestamps < nextMonday.getTime())
                      .reduce((acc, tx) => acc + Number(tx.amount), 0)

        let dateLabel = DateTime.fromJSDate(prevMonday).weekNumber;

        labels.push(`Week ${dateLabel}`);
        values.push(value);
      }
    }

    // agreggate transaction amounts per month for the last 12 months
    if (this.props.timePeriod === "month") {
      let month = new Date().getMonth();
      let year = new Date().getFullYear() - 1;

      for (let i = 0; i < 12; i++) {

        if (month === 12) {
          month = 0;
          year++;
        }

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth  = new Date(year, month + 1, -1);

        const value = this.props.transactions
                      .filter(tx => tx.timestamps >= firstDayOfMonth.getTime() && tx.timestamps < lastDayOfMonth.getTime())
                      .reduce((acc, tx) => acc + Number(tx.amount), 0)

        let dateLabel = firstDayOfMonth.toDateString().split(" ")[1];

        labels.push(dateLabel);
        values.push(value);

        month++;
      }
    }

    console.log("all transacs", this.props.transactions);
    console.log("values", values);
  
    const data = {
      labels,
      datasets: [
        {
          label: "Transactions",
          data: values,
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