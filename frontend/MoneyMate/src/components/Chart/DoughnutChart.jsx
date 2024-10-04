import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
const vibrantColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#90e0ef',
    '#ef233c',
    '#c77dff',
    '#8eecf5',
    
  ];
  
  const vibrantHoverColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#00b4d8',
    '#d90429',
    '#9d4edd',
    '#90dbf4',
  ];
  function randomColor(){
    let len = vibrantColors.length;
    let ind = Math.floor(Math.random()*len)+1;
    return ind;
  }
ChartJs.register(ArcElement, Tooltip, Legend);
function DoughnutChart({data,label}) {
    let indices =[];
    let color =[];
    let hoverColor =[];
    Object.keys(data).map(()=>indices.push(randomColor()))
    for(let i=0;i<indices.length;i++){
        color.push(vibrantColors[indices[i]]);
        hoverColor.push(vibrantHoverColors[indices[i]]);
    }
    const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: label,
            data: Object.values(data),
            backgroundColor:color,
            hoverBackgroundColor:hoverColor,
          },
        ],
      };
  return (
    <div>
        <Doughnut data={chartData}/>
    </div>
  )
}

export default DoughnutChart;