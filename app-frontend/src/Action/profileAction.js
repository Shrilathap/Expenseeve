import axios from 'axios'
export const startGetProfile=()=>{
    return (dispatch,getState)=>{
        axios.get('http://localhost:3065/api/profile',{
            headers:{
                'authorization':localStorage.getItem('token')
            }})
        .then((response)=>{
            const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log((data.errors))
            }
            else{
                dispatch(getUserProfile(data))
            }

        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}


export const startUpdateProfile=(id,formData,handleClose)=>{
    return (dispatch,getState)=>{
         axios.put(`http://localhost:3065/api/profile/${id}`,formData,{
             headers:{
                 'authorization':localStorage.getItem('token')
             }})
         .then((response)=>{
             const data=response.data
             if(data.hasOwnProperty('errors')){
                 alert(data.errors)
             }
             else{
                 dispatch(setUpdateProfile(data))
                 handleClose()
             }
 
         })
         .catch((err)=>{
             console.log(err.message)
         })
     }
 }
const getUserProfile=(profile)=>{
    return{
        type:'GET_USER_PROFILE',
        payload:profile
    }
}

const setUpdateProfile=(profile)=>{
    return{
        type:'UPDATE_USER_PROFILE',
        payload:profile

    }
}
