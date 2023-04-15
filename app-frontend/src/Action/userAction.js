import axios from 'axios'
import swal from 'sweetalert'
import { startGetExpense } from './expenseAction'
import {startGetCategory} from './categoryAction'
import { startGetBudget } from './budgetAction'
export  const startAddUser=(user,onHide,setLoginModalShow)=>{
    return (dispatch,getState)=>{
        axios.post('http://localhost:3065/api/users/register',user)
        .then((response)=>{
            const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(setAddUser(data))
                onHide()
                setLoginModalShow(true)
                swal('Successfully Registered')
            }

        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const startLoginUser=(user,props)=>{
    const{onHide,handleAuth}=props
    return (dispatch,getState)=>{
        axios.post('http://localhost:3065/api/users/login',user)
        .then((response)=>{
            const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                localStorage.setItem('token',data.token)
                onHide()
                handleAuth()
                props.history.push('/')
                dispatch(startGetExpense())
                dispatch(startGetCategory())
                dispatch(startGetBudget())
                swal('Successfully Loggedin')
            }

        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const startGetUser=()=>{
    return (dispatch,getState)=>{
        axios.get('http://localhost:3065/api/users/account',{
            headers:{
                'authorization':localStorage.getItem('token')
            }})
        .then((response)=>{
            const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(setUserAccount(data))
            }

        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}

export const startSetUserProfile = (formData,setFile) => {
    return (dispatch) => {
        axios.post('http://localhost:3065/api/upload-profile', formData,{
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if(result){
                    dispatch(addProfileImg(result))
                    setFile('')
                    dispatch(startGetUserProfilePic())
                }
            })
            .catch(err => console.log(err))
    }
}

const addProfileImg = (data) => {
    return {
        type: 'ADD_USER_PROFILE',
        payload: data
    }
}

export const startGetUserProfilePic = () => {
    return (dispatch) => {
        axios.get('http://localhost:3065/api/upload-profile', {
            headers: {
                "Authorization" : localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(setProfile(result))
            })
            .catch(err => console.log(err))
    }
}

const setProfile = (data) => {
    return {
        type: 'GET_PROFILE_PIC',
        payload: data
    }
}


const setAddUser=(user)=>{
    return{
        type:'ADD_USER',
        payload:user
    }
}
// const setLoginUser=(token)=>{
//     return {
//         type:'LOGIN_USER',
//         payload:token
//     }
// }

const setUserAccount=(user)=>{
    return{
        type:'USER_ACCOUNT',
        payload:user
    }
}



export const startLogoutAction=()=>{
    return {
        type:'LOGOUT_USER'
    }
}