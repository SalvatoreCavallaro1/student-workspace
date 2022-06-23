import { SET_USER} from "./actiontype";

// combineReducers mi aiuterà a combinare più di un reducer 
import { combineReducers } from "redux";

let defaultUserState = {
    currentUser: null
}
// action mi viene data da actioncreator
const userReducer = (state = defaultUserState, action) => {
    if (action.type === SET_USER) {
        let payload = action.payload;
        state = { ...payload }; //uso lo spread operator per creare un clone del payload object per assegnarlo allo stato
        return state;
    }
    return state;
}

let defaultChannelState = {
    currentChannel: null,
    loading : true
}


const channelReducer = (state = defaultChannelState, action) => {
    if (action.type === SET_CHANNEL) {
        let payload = action.payload;
        state = { ...payload };
        state.loading= false;
        return state;
    }
    return state;
}


// ocsì ogni volta che devo accedere a questo stato uso state.user per accedere 
export const combinedReducers = combineReducers({ user: userReducer })