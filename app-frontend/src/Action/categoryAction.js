import axios from "axios"

export const startAddCategory=(category)=>{
    return(dispatch,getState)=>{
        axios.post('http://localhost:3065/api/categories',category,
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
                dispatch(addCategory(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startGetCategory=()=>{
    return(dispatch,getState)=>{
        axios.get('http://localhost:3065/api/categories',
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
                dispatch(getCategory(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const startDeleteCategory=(id)=>{
    return(dispatch,getState)=>{
        axios.delete(`http://localhost:3065/api/categories/${id}`,
        {
            headers:{
                'authorization':localStorage.getItem('token')
            }})
            .then((response)=>{
                const data=response.data._id
            if(data.hasOwnProperty('errors')){
                console.log(data.errors)
            }
            else{
                dispatch(deleteCategory(data))
                dispatch(deleteExpense(data))
            }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

const addCategory=(category)=>{
    return {
        type:'ADD_CATEGORY',
        payload:category
    }
}

const getCategory=(categories)=>{
    return {
        type:'GET_CATEGORY',
        payload:categories
    }
}


const deleteCategory=(id)=>{
    return {
        type:'DELETE_CATEGORY',
        payload:id
    }
}

const deleteExpense=(id)=>{
    return {
        type:'DELETE_EXPENSE_bY_CATEGORYID',
        payload:id
    }
}