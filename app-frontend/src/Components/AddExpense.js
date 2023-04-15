import React,{useState} from "react";
import ExpenseForm from "./ExpenseForm";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { startAddExpense } from "../Action/expenseAction";

const AddExpense=(props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch=useDispatch()
    const formSubmission=(formData)=>{
        dispatch(startAddExpense(formData,handleClose))
    }
    return(
        <div>
            <Button variant="primary" onClick={handleShow} name="AddExpense">Add Expense</Button><br /><br />
            <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                ><Modal.Header closeButton>
                        <Modal.Title>Expense Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <ExpenseForm formSubmission={formSubmission}/>
                    </Modal.Body>
                </Modal>
        </div>
    )
}
export default AddExpense