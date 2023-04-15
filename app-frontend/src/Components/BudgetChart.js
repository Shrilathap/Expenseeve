import React from "react";
import { Chart } from "react-google-charts";

const BudgetChart=(props)=>{
  const{budget,expenses}=props

const notDeleted=expenses.filter((ele)=>{
  return ele.deleted!==true
})

const expenseAmount = notDeleted.reduce((acc, expense) => acc + expense.amount, 0)

    const substracted=budget.amount-expenseAmount

    const data=[['Budget','Expense'],['Budget',substracted],['Expense',expenseAmount]]
    const options = {
      is3D: true
      };
  return (
  <div>{
    expenses?
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"150px"}
    />:'Loading'
    }
  </div>
    
  );
}

export default BudgetChart
