const userInitialState={}

const userReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'ADD_USER':{
            return null
        }
        case 'USER_ACCOUNT':{
            return{...state,...action.payload}
        }
        case 'LOGOUT_USER':{
            return {}
        }
        case 'ADD_USER_PROFILE' : {
            return {...state, ...action.payload}
        }
        case 'GET_PROFILE_PIC' : {
            return {...state, ...action.payload}
        }
        default:{
            return {...state}
        } 
    }
}

export default userReducer