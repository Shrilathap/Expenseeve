const userInitialState=[]

const categoryReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'ADD_CATEGORY':{
            return [...state,action.payload]
        }
        case 'GET_CATEGORY':{
            return [...action.payload]
        }
        case 'DELETE_CATEGORY':{
            return(state.filter(ele =>ele._id!==action.payload))
        }
        case 'LOGOUT_USER':{
            return {}
        }
        default:{
            return [...state]
        } 
        
    }
}

export default categoryReducer