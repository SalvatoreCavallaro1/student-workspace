import { SET_USER} from "./actiontype";

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: {
            currentUser : user
        }
    }
}