import axios from "axios"

export const startGetBudget=(amount)=>{
    return(dispatch,getState)=>{
        axios.get('http://localhost:3065/api/users/budget',
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const data=response.data
            if(data.hasOwnProperty('errors')){
                alert(data.errors)
            }
            else{
                dispatch(getBudget(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startUpdateBudget=(amount)=>{
    return(dispatch,getState)=>{
        axios.put('http://localhost:3065/api/users/budget',amount,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const data=response.data
            if(data.hasOwnProperty('errors')){
                alert(data.errors)
            }
            else{
                dispatch(updateBudget(data))
                console.log("data",data)
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

const getBudget=(budget)=>{
    return {
        type:'GET_BUDGET',
        payload:budget
    }
}

const updateBudget=(budget)=>{
    return {
        type:'UPDATE_BUDGET',
        payload:budget
    }
}
