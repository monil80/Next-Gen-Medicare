import * as actionTypes from "../constants/userConstant";

let check = false;
if (localStorage.getItem('auth-token')) {
    check = true;
}


export const userReducer = (state = { check }, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                
                check : action.payload
            }
        default:
            return state;
    }
};
