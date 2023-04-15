import React from "react";
import { Chart } from "react-google-charts";

const ExpenseChart=(props)=>{
    const{data:newData}=props
    const data=[['Category','Expense'],...newData]
    const options = {
      is3D: true
      };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"150px"}
    />
  );
}

export default ExpenseChart