import React from 'react'
import { Pie } from 'react-chartjs-2'
const vibrantColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];

const vibrantHoverColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];
function randomColor(){
  let len = vibrantColors.length;
  let ind = Math.floor(Math.random()*len)+1;
  return ind;
}
function PieChart({data,label}) {
  //generating random colors
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
        <Pie data={chartData}/>
    </div>
  )
}

export default PieChart