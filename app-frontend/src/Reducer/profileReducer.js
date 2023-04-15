const userInitialState={}

const profileReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'GET_USER_PROFILE':{
            return{...state,...action.payload}
        }
        case 'UPDATE_USER_PROFILE':{
            return {...state,...action.payload}
        }
        default:{
            return {...state}
        } 
    }
}

export default profileReducer