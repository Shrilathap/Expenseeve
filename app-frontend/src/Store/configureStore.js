import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../Reducer/userReducer'
import budgetReducer from '../Reducer/budgetReducer'
import categoryReducer from '../Reducer/categoryReducer'
import expenseReducer from '../Reducer/expenseReducer'
import profileReducer from '../Reducer/profileReducer'
 
const configureStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        profile:profileReducer,
        budget:budgetReducer,
        category:categoryReducer,
        expense:expenseReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore