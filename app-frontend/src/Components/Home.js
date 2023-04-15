import React, { useEffect} from "react"
import { useSelector } from "react-redux";
import Contact from "./Contact"
import Picture from "../ExpenseeveHome.jpg"
import { useDispatch} from "react-redux";
import { startGetCategory } from '../Action/categoryAction'
import { startGetBudget } from "../Action/budgetAction";
import { startGetExpense } from "../Action/expenseAction";
import BudgetChart from './BudgetChart'
import { Card } from 'antd';
import ExpenseChartContainer from "./ExpenseChartContainer";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";

const Home = (props) => {
    const userLoggedIn = localStorage.getItem('token')
    const [budget, expenses] = useSelector((state) => {
        return [state.budget, state.expense]
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(startGetCategory())
            dispatch(startGetBudget())
            dispatch(startGetExpense())
        }
    }, [])


    const rowStyle = {
        display: "flex",
        justifyContent: "center",
      }

      const leftColumnStyle = {
        padding: "20px",
      };
    
      const rightColumnStyle = {
        padding: "20px",
      };


    return (
        <div>{
            userLoggedIn ? (<div className="container">
                <div className=" row g-2" style={rowStyle}>
                    <div className=" col-6" style={leftColumnStyle}>
                        <Card
                            title="Budget Overview"
                            bordered={true}

                            style={{
                                width:"100%", borderBlockColor: 'aquamarine', borderBlockWidth: 10
                            }}
                        >
                            <BudgetChart budget={budget} expenses={expenses}/>
                        </Card>
                    </div>
                    <div className=" col-6" style={rightColumnStyle}>
                        <Card
                            title="Expense Overview"
                            bordered={true}

                            style={{
                                width: "100%", borderBlockColor: 'aquamarine', borderBlockWidth: 10
                            }}
                        >
                            <ExpenseChartContainer />
                        </Card>
                    </div>
                </div>
                <br /><br />
                <AddExpense />
                <ExpenseList />
            </div>) : (<div>
                <img src={Picture} style={{ width: '100%', height: '50%' }} alt="Expenseeve" />
                <Contact />
            </div>)
        }
        </div>
    )
}
export default Home