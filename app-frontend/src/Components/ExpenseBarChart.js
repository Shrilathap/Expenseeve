import React from "react";
import { Chart } from "react-google-charts";

const ExpenseBarChart=(props)=>{
    const {newData}=props
    const data=[['Category','Expense'],...newData]
    return (
      <Chart chartType="ColumnChart" width="100%" height="150px" data={data} />
    )
  }
  export default ExpenseBarChart