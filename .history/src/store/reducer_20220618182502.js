import { SET_USER} from "./actiontype";

// combineReducers mi aiuterà a combinare più di un reducer 
import {combineReducers} from "redux"

let defaultState = {
    currentUser: null
}

// action mi viene data da actioncreator
const userReducer = (state = defaultState, action) => {
    if(action.type === SET_USER){
        let payload= action.payload;
        state = {...payload}  //uso lo spread operator per creare un clone del payload object per assegnarlo allo stato
        return state;
    }
    return state;
}


// ocsì ogni volta che devo accedere a questo stato uso state.user per accedere 
export const combineReducers= combineReducers({user: userReducer})