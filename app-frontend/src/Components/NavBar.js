import React,{useState} from "react";
import {Route,withRouter } from 'react-router-dom';
import Contact from "./Contact";
import Home from './Home'
import Register from "./Register";
import Login from "./Login"
import Settings from "./Settings";
import Profile from "./Profile";
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from "react-redux";
import { startLogoutAction } from "../Action/userAction";
import {HomeFilled,SettingFilled,UserOutlined} from '@ant-design/icons'
import Nav from 'react-bootstrap/Nav';
import swal from 'sweetalert'


const NavBar=(props)=>{
    const dispatch=useDispatch()
    const {userLoggedIn,handleAuth}=props
    const [registerModalShow, setRegisterModalShow] =useState(false);
    const[loginModalShow,setLoginModalShow]=useState(false)
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand >Expenseeve</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <li><Nav.Link href='/'><HomeFilled />Home</Nav.Link></li>
            {
            userLoggedIn?(<React.Fragment>
                            <li><Nav.Link href='/settings'><SettingFilled />Settings</Nav.Link></li>
                            <li><Nav.Link href='/profile'><UserOutlined />Profile</Nav.Link></li>
                            <li><Nav.Link onClick={() => {
                                dispatch(startLogoutAction())
                                localStorage.removeItem('token')
                                swal("succecfully logged out")
                                handleAuth()
                                props.history.push('/')
                                window.location.reload()
                            }}>Logout</Nav.Link></li>
            </React.Fragment>):(<React.Fragment>
                <li><Nav.Link href='/contact'>Contact Us</Nav.Link></li>
                <li><Nav.Link onClick={()=>setRegisterModalShow(true)}>Register</Nav.Link></li>
                <li><Nav.Link onClick={()=>setLoginModalShow(true)}>Login</Nav.Link></li>
            </React.Fragment>)}
                </Navbar.Collapse>
            </Navbar>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/contact" component={Contact}/>
            <Route  render={(props)=><Register
            show={registerModalShow}  onHide={()=>setRegisterModalShow(false)} setLoginModalShow={setLoginModalShow} />} exact={true} />
            <Route render={(props)=><Login history={props.history} handleAuth={handleAuth}
            show={loginModalShow} onHide={()=>setLoginModalShow(false)}/>} exact={true}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/profile" component={Profile}/>
        </div>
    )
}

export default withRouter(NavBar)

// const WrappedComponent=withRouter(NavBar)
// export default WrappedComponent