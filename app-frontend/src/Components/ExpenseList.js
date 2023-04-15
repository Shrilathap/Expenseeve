import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table'
import { startSoftDeleteExpense } from "../Action/expenseAction";
import EditExpense from "./EditExpense";
import Pagination from "./Pagination";
import {EditFilled,DeleteFilled} from '@ant-design/icons'

const ExpenseList=(props)=>{
    const dispatch=useDispatch()
    const [expenses,categories]=useSelector((state)=>{
        return [state.expense,state.category]
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [selectedExpense,setSelectedExpense]=useState('')
    const [search,setSearch]=useState('')


    const searchFilter=expenses.filter((ele)=>{
        return ele.name.toLowerCase().includes(search)&&ele.deleted!==true
    })


    const totalPages = Math.ceil(searchFilter.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentExpenses = searchFilter.slice(startIndex, endIndex)


    const handleUpdate=(expense)=>{
        setSelectedExpense(expense)
        handleShow()
    }

    const handleDelete=(id)=>{
        dispatch(startSoftDeleteExpense(id))
    }

    const handleSearch=(e)=>{
        const key=e.target.value
        setSearch(key)
    }

    return(
        <div className="container">
            <input type='text' value={search} placeholder="search by expense name" onChange={handleSearch}/><br/><br/>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>ExpenseDate</th>
                        <th>Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            searchFilter.length>0&&categories.length>0&&
                            currentExpenses.map((ele)=>{
                                    return (
                                        <tr key={ele._id}>
                                    {
                                    categories.find((e)=>e._id===ele.categoryId).name?
                                    (<td>{categories.find((e)=>e._id===ele.categoryId).name}</td>):<td>`undefined`</td>}
                                    <td>{ele.name}</td>
                                    <td>{ele.expenseDate}</td>
                                    <td>{ele.amount}</td>
                                    <td className="btn text-primary" onClick={()=>{handleUpdate(ele)}}>
                                    <EditFilled style={{color:'blue'}} /></td>
                                    <td className="text-danger" onClick={()=>{handleDelete(ele._id)}}><DeleteFilled style={{color:'red'}} /></td>
                                    </tr>
                                    )
                            })
                        }
                </tbody>
            </Table>
            <Pagination handlePageChange={handlePageChange} totalPages={totalPages}/>
            <EditExpense handleClose={handleClose} show={show} selectedExpense={selectedExpense}/>
        </div>
    )
}

export default ExpenseList
