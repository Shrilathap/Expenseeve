import React from "react"
import { Formik} from 'formik';
import Modal from 'react-bootstrap/Modal';
import  Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import {startLoginUser} from '../Action/userAction'
const Login=(props)=>{
  const {show,onHide}=props
    const dispatch=useDispatch()
    return(
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
    <Formik
      initialValues={{ email: '', password: '' }}

      validate={values => {
        const errors = {}
        if (!values.email) {
          errors.email = 'Email is Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}

      onSubmit={(values, { setSubmitting }) => {
        
        setTimeout(() => {
          dispatch(startLoginUser(values,props))
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false)
          
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
      <label>Email</label><br/>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          /><br/>
          {errors.email && touched.email && errors.email}<br/>
          <label>Password</label><br/>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          /><br/>
          {errors.password && touched.password && errors.password}<br/>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      )}
    </Formik>
    </div>
    </Modal.Body>
    </Modal>
)
}
export default Login