import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGetBudget,startUpdateBudget } from "../Action/budgetAction";
import {startGetCategory} from '../Action/categoryAction'
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { Card } from 'antd';
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

const Settings=(props)=>{
    const budget=useSelector((state)=>{
        return state.budget
    })
    const [show, setShow] = useState(false)
    const [amount,setAmount]=useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startGetBudget())
        dispatch(startGetCategory())
    },[dispatch])

    const handleBudget=(e)=>{
        e.preventDefault()
        dispatch(startUpdateBudget({amount:amount}))
        handleClose()
        setAmount('')
    }

    const handleChange=(e)=>{
        const amount=e.target.value
        setAmount(amount)
    }
    return(
        <div className="container">
            <Card
                title="Total Budget"
                bordered={true}
                
                style={{
                    width: 300, borderBlockColor:'aquamarine',borderBlockWidth:5
                }}
            >
            <h4>{budget.amount}</h4>
            </Card>
            <Button variant="primary" onClick={handleShow}>Update</Button><br/><br/>
            <Modal
                size="sm"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            ><Modal.Header closeButton>
                    <Modal.Title>Enter amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleBudget}>
                        <input type='text' placeholder="Enter amount" value={amount} onChange={handleChange} />
                    </form>
                </Modal.Body>
            </Modal>
            <CategoryForm/><br/>
            <CategoryList/>
        </div>
    )
}
export default Settings