import React from "react";
import ExpenseChart from "./ExpenseChart";
import ExpenseBarChart from "./ExpenseBarChart";
import { useSelector } from "react-redux";

const ExpenseChartContainer=(props)=>{
    const [categories, expenses] = useSelector((state) => {
        return [state.category, state.expense]
    })
    const notDeleted=expenses.filter((ele)=>{
        return ele.deleted!==true
    })
    function getCategoryAmount(expenses, category) {
        let total = 0;
    
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].categoryId === category) {
                total += expenses[i].amount
            }
        }
        return total;
    }

    const data=(categories)=>{
        let result=[]
        for(let i = 0; i < categories.length; i++){
            let foodTotal = getCategoryAmount(notDeleted,categories[i]._id) 
            result.push([categories[i].name,foodTotal]) 
        }
        return result
    }
    const newData= (data(categories))

    return(
        <div>
            {
                newData.length>5?<ExpenseBarChart newData={newData} />:<ExpenseChart data={newData}/>
            }
        </div>
    )
}
export default ExpenseChartContainer