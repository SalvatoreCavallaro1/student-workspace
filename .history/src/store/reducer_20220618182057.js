import { SET_USER} from "./actiontype";

let defaultState = {
    currentUser: null
}

// action mi viene data da actioncreator
const userReducer = (state = defaultState, action) => {
    if(action.type === SET_USER){
        let payload= action.payload
    }

}