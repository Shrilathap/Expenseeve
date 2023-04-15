const budgetInitialState={}

const budgetReducer=(state=budgetInitialState,action)=>{
    switch(action.type){
        case 'GET_BUDGET':{
            return {...state,...action.payload}
        }
        case 'UPDATE_BUDGET':{
            return {...state,...action.payload}
        }
        case 'LOGOUT_USER':{
            return {}
        }
        default:{
            return {...state}
        } 
    }
}

export default budgetReducer