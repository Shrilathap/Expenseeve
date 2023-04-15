import React from "react";
import ExpenseForm from "./ExpenseForm";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { startUpdateExpense } from "../Action/expenseAction";

const EditExpense=(props)=>{
    const{handleClose,selectedExpense,show}=props
    const id=selectedExpense._id
    // console.log(id)
    const dispatch=useDispatch()
    const formSubmission=(formData)=>{
        console.log(formData)
        dispatch(startUpdateExpense(id,formData,handleClose))
    }
    return(
        <div>
            <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                ><Modal.Header closeButton>
                        <Modal.Title>Expense Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <ExpenseForm selectedExpense={selectedExpense} formSubmission={formSubmission}/>
                    </Modal.Body>
                </Modal>
        </div>
    )
}
export default EditExpense