import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { analysis } from '../../utils/Icons'
import styled from 'styled-components';
import PieChart from '../Chart/PieChart';
import BarChart from '../Chart/BarChart';
import DoughnutChart from '../Chart/DoughnutChart';
const BASE_URL = "http://localhost:5000/api/v1/";

function Analysis() {
    const [incomeSummary,setIncomeSummary] = useState({});
    const [expenseSummary,setExpenseSummary] = useState({});
    const [incomeDistribution,setIncomeDistribution] = useState([]);
    const [expenseDistribution,setExpenseDistribution] = useState([]);
    const [monthlyIncomeSummary,setMonthlyIncomeSummary]=useState({});
    const [monthlyExpenseSummary,setMonthlyExpenseSummary]=useState({});
    const [incomeMonth,setIncomeMonth] = useState('');
    const [expenseMonth,setExpenseMonth] = useState('');
    const [activeIncomeMonth, setActiveIncomeMonth] = useState('');
    const [activeExpenseMonth, setActiveExpenseMonth] = useState('');
    const[error,setError] = useState(0);
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get(`${BASE_URL}get-analysis`);
                setIncomeSummary(response.data.incomeSummary);
                setExpenseSummary(response.data.expenseSummary);
                setIncomeDistribution(response.data.monthlyIncomeBreakDown.slice().reverse());
                setExpenseDistribution(response.data.monthlyExpenseBreakDown.slice().reverse());
                setMonthlyIncomeSummary(response.data.monthlyIncomeSummary);
                setMonthlyExpenseSummary(response.data.monthlyExpenseSummary);
                setError(0)
                // console.log(response.data);
            }catch(error){
                setError(1);
                console.log("Could not get The Analysis ",error)
            }
        }
        fetchData();
        
    },[]);
    useEffect(() => {
        console.log("Updated incomeSummary:", incomeSummary);
    }, [incomeSummary]);

    useEffect(() => {
        console.log("Updated expenseSummary:", expenseSummary);
    }, [expenseSummary]);

    useEffect(() => {
        console.log("Updated incomeDistribution:", incomeDistribution);
    }, [incomeDistribution]);

    useEffect(() => {
        console.log("Updated expenseDistribution:", expenseDistribution);
    }, [expenseDistribution]);

    useEffect(() => {
        const months = Object.keys(monthlyIncomeSummary);
        if(months.length>0){
            setIncomeMonth(months[0]);
            setActiveIncomeMonth(months[0]);
        }
        else{
            setIncomeMonth('');
            setActiveIncomeMonth('');
        }
        console.log("Updated monthlyIncomeSummary:", monthlyIncomeSummary);
    }, [monthlyIncomeSummary]);

    useEffect(() => {
        const months = Object.keys(monthlyExpenseSummary);
        if(months.length>0){
            setExpenseMonth(months[0]);
            setActiveExpenseMonth(months[0]);
        }
        else{
            setExpenseMonth('');
            setActiveExpenseMonth('');
        }
        console.log("Updated monthlyExpenseSummary:", monthlyExpenseSummary);
    }, [monthlyExpenseSummary]);
    function handleMonthClick(month,type){
        if(type=='income'){
            setIncomeMonth(month);
            setActiveIncomeMonth(month)
            console.log("income month set as: ",month)
        }
        else{
            setExpenseMonth(month);
            setActiveExpenseMonth(month);
            console.log("expense month set as: ",month)
        }
    }
  return (
    <>
    
    <AnalysisStyled>
    <h1>Analysis</h1>
        <div className='graph-content'> 
            {error ? ("Could Not Display the data :("):(
                <>
                {
                    Object.keys(incomeSummary).length &&
                    <>
                        <p>income-category-wise</p>
                        <div className='pie-chart'>
                            <PieChart data={incomeSummary} label={"Total Income"}/>
                        </div>
                    </>
                }
                {
                    Object.keys(expenseSummary).length &&
                    <>
                        <p>expense-category-wise</p>
                        <div className='pie-chart'>
                            <PieChart data={expenseSummary} label={"Total Expense"}/>
                        </div>
                    </>
                }
                <div className="button-panel">
                    {Object.keys(monthlyIncomeSummary).map((month,index)=>(
                        <button key={index} 
                        className={month === activeIncomeMonth ? 'active' : ''}
                        onClick={()=> handleMonthClick(month,"income")
                        }>
                            {month}
                        </button>
                    ))}
                </div>
                <div className="doughnut-chart">
                {
                    incomeMonth && monthlyIncomeSummary[incomeMonth] &&
                    <>
                    <p>Income Distribution For {incomeMonth}</p>
                    <DoughnutChart data={monthlyIncomeSummary[incomeMonth]}
                    label={`Income Distribution for ${incomeMonth}`}/>
                    </>
                }
                </div>
                <div className="button-panel">
                    {Object.keys(monthlyExpenseSummary).map((month,index)=>(
                        <button key={index} 
                        className={month === activeExpenseMonth ? 'active' : ''}
                        onClick={()=> handleMonthClick(month,"expense")
                        }>
                            {month}
                        </button>
                    ))}
                </div>
                <div className="doughnut-chart">
                {
                    expenseMonth && monthlyExpenseSummary[expenseMonth] &&
                    <>
                    <p>Expense Distribution For {expenseMonth}</p>
                    <DoughnutChart data={monthlyExpenseSummary[expenseMonth]}
                    label={`Income Distribution for ${expenseMonth}`}/>
                    </>
                }
                </div>
                </>
            )}
        </div>
    </AnalysisStyled>
    {
        error ? ("") :
        <GraphStyled>
            <div className="income-distribution">
                <p>Income-distribution</p>
                <BarChart data={incomeDistribution} label={"Income"}/>
            </div>
            <div className="expense-distribution">
                <p>Expense-distribution</p>
                <BarChart data={expenseDistribution} label={"Expense"}/>
            </div>
        </GraphStyled>
    }
    
    </>
  )
}
const AnalysisStyled = styled.h1`
    display: flex;
    margin: 5%;
    flex-direction: column;
    p {
        font-size: 1.5rem;
    }
    h1 {
        text-align: center;
        font-size: 2.5rem;
    }
    .pie-chart{
        width:50%;
        margin-bottom: 2rem;
    }
    .button-panel {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 2rem;

        button {
            background: transparent;
            // border: 1px solid transparent;
            border: none;
            color: var(--primary-color);
            font-size: 1rem;
            cursor: pointer;
            margin: 0.5rem;
            padding: 0.5rem 1rem;
            position: relative;
            overflow: hidden;
            transition: color 0.3s;

            &:hover {
                font-weight: bold;
                color: var(--primary-color); 
                border-color: var(--primary-color);
            }

            &:after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: var(--primary-color);
                transform: translateX(-100%);
                transition: transform 0.6s;
            }

            &:hover:after {
                transform: translateX(0);
            }
            &.active {
                font-weight: bold;
                border-bottom: 2px solid var(--primary-color);
            }
        }
    }
    .doughnut-chart{
        width: 50%;
        margin-bottom: 4rem;
    }
    
`;
const GraphStyled = styled.div`
    margin: 5%;
    display: flex;
    flex-direction: column;
    p{
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--primary-color);
    }
    .income-distribution{
        margin-bottom: 4rem;
    }
`
export default Analysis