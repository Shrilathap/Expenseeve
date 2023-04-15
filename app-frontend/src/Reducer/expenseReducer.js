const userInitialState=[]

const expenseReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'ADD_EXPENSE':{
            return [...state,action.payload]
        }
        case 'GET_EXPENSE':{
            return [...action.payload]
        }
        case 'UPDATE_EXPENSE':{
            return (state.map((ele)=>{
                if(ele._id===action.payload.id){
                    return {...ele, ...action.payload.expense}
                  }
                  else{
                    return {...ele}
                  }
            }))
        }
        case 'DELETE_EXPENSE_bY_CATEGORYID':{
            return (state.filter(ele=>ele.categoryId!==action.payload))
        }
        case 'DELETE_EXPENSE':{
            return(state.filter(ele =>ele._id!==action.payload))
        }
        case 'SOFT_DELETE_EXPENSE':{
             return (state.map((ele)=>{
                if(ele._id===action.payload.id){
                    return {...ele, ...action.payload.expense}
                  }
                  else{
                    return {...ele}
                  }
            }))
        }
        case 'RESTORE_EXPENSE':{
            return (state.map((ele)=>{
                if(ele._id===action.payload.id){
                    return {...ele, ...action.payload.expense}
                  }
                  else{
                    return {...ele}
                  }
            }))
        }
        case 'LOGOUT_USER':{
            return {}
        }
        default:{
            return [...state]
        } 
        
    }
}

export default expenseReducer