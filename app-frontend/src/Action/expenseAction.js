import axios from "axios"

export const startAddExpense=(expense,handleClose)=>{
    return(dispatch,getState)=>{
        axios.post('http://localhost:3065/api/expenses',expense,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(addExpense(data))
                handleClose()
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startGetExpense=()=>{
    return(dispatch,getState)=>{
        axios.get('http://localhost:3065/api/expenses',
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{

                dispatch(getExpense(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startUpdateExpense=(id,formData,handleClose)=>{
    return(dispatch,getState)=>{
        axios.put(`http://localhost:3065/api/expenses/${id}`,formData,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const id=response.data._id
                const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(updateExpense(id,data))
                handleClose()
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startDeleteExpense=(id)=>{
    return(dispatch,getState)=>{
        axios.delete(`http://localhost:3065/api/expenses/${id}`,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                console.log(response)
                const data=response.data._id
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(deleteExpense(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startSoftDeleteExpense=(id)=>{
    return(dispatch,getState)=>{
        axios.delete(`http://localhost:3065/api/expenses/softdelete/${id}`,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const id=response.data._id
                const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(softDeleteExpense(id,data))
                window.location.reload()
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startRestoreExpense=(id)=>{
    return(dispatch,getState)=>{
        axios.get(`http://localhost:3065/api/expenses/restored/${id}`,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const id=response.data._id
                const data=response.data
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(restoreExpense(id,data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

const addExpense=(expense)=>{
    return {
        type:'ADD_EXPENSE',
        payload:expense
    }
}

const getExpense=(expense)=>{
    return {
        type:'GET_EXPENSE',
        payload:expense
    }
}


const deleteExpense=(id)=>{
    return {
        type:'DELETE_EXPENSE',
        payload:id
    }
}

const softDeleteExpense=(id,expense)=>{
    return {
        type:'SOFT_DELETE_EXPENSE',
        payload:{id,expense}
    }
}

const updateExpense=(id,expense)=>{
    return {
        type:'UPDATE_EXPENSE',
        payload:{id,expense}
    }
}

const restoreExpense=(id,expense)=>{
    return {
        type:'RESTORE_EXPENSE',
        payload:{id,expense}
    }
}