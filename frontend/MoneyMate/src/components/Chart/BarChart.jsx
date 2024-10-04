import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJs.register(
    CategoryScale,
    LinearScale,  
    Title,
    Tooltip,
    Legend,
    BarElement
)

function BarChart({data,label}) {
    const chartData = {
        labels: data.map(item => item.month), // Assuming data is an object with months as keys
        datasets: [
            {
                label: label,
                data: data.map(item => item.amount), // Assuming data is an object with amounts as values
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(201, 203, 207, 0.5)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

  return (
    <Bar data={chartData} options={options}/>
  )
}

export default BarChart