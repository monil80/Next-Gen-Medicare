import * as actionTypes from "../constants/userConstant";
export const getuser = () => async (dispatch) => {
  let check = false;
  if (localStorage.getItem("auth-token")) {
    check = true;
    // console.log("🚀 ~ file: userAction.js:7 ~ getuser ~ check:", check);
  }

  dispatch({
    type: actionTypes.USER_LOGIN,
    payload: check,
  });
};
