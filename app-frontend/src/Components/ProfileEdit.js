import React,{useState} from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {EditFilled} from '@ant-design/icons'
import ProfileForm from "./ProfileForm";
import { startUpdateProfile } from "../Action/profileAction";

const ProfileEdit=(props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const profile=useSelector((state)=>{
        return state.profile
    })

    const dispatch=useDispatch()
    const formSubmission=(formData)=>{
            dispatch(startUpdateProfile(profile._id,formData,handleClose))
    }
    return(
        <div>
            <button onClick={handleShow} ><EditFilled style={{color:'blue'}} />Edit</button>
            <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                ><Modal.Header closeButton>
                        <Modal.Title>Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <ProfileForm formSubmission={formSubmission} profile={profile}/>
                    </Modal.Body>
                </Modal>
        </div>
    )
}
export default ProfileEdit