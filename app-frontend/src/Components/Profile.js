import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table'
import { startDeleteExpense, startGetExpense, startRestoreExpense } from "../Action/expenseAction";
import { startGetCategory } from "../Action/categoryAction";
import ProfileDetails from "./ProfileDetails";
import { startGetUser } from "../Action/userAction";
import {startGetProfile} from '../Action/profileAction'
import { startGetUserProfilePic } from "../Action/userAction";
import {DeleteFilled,UndoOutlined} from '@ant-design/icons'
import swal from 'sweetalert';


const Profile=(props)=>{
    const [expenses,categories]=useSelector((state)=>{
        return [state.expense,state.category]
    })
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startGetExpense())
        dispatch(startGetCategory())
        dispatch(startGetUser())
        dispatch(startGetProfile())
        dispatch(startGetUserProfilePic())
    },[])

    const handleDelete=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(startDeleteExpense(id))
              swal(" Your file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your file is safe!");
            }
          })
    }

    const handleRestore=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Do you really want to restore this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(startRestoreExpense(id))
              swal(" Your file has been restored!", {
                icon: "success",
              });
            } else {
              swal("Your file is in bin!");
            }
          })
    }

    const deleted=expenses.filter((ele)=>{
        return ele.deleted===true
    })
    return(
        <div className="container">
            <ProfileDetails/>
            <h4>Deleted Expenses</h4>
            <Table responsive="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>ExpenseDate</th>
                        <th>Amount</th>
                        <th>Delete</th>
                        <th>Restore</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            deleted.length>0&&categories.length>0&&
                            deleted.map((ele)=>{
                                    return (
                                        <tr key={ele._id}>
                                    <td>{categories.find((e)=>e._id===ele.categoryId).name}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.expenseDate}</td>
                                    <td>{ele.amount}</td>
                                    <td className="btn text-danger" onClick={()=>{handleDelete(ele._id)}}>
                                    <DeleteFilled style={{color:'red'}} /></td>
                                    <td className="text-primary" onClick={()=>{handleRestore(ele._id)}}><UndoOutlined /></td>
                                    </tr>
                                    )
                            })
                        }
                </tbody>
            </Table>
        </div>
    )
}
export default Profile