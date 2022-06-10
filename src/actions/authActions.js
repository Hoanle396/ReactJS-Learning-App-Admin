import * as types from "./types"

const user= localStorage.getItem("token")
const initialState = {
  username: user?user:"",
  isLoggedIn: user?true:false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return {
        ...state,
        username: action.username,
        isLoggedIn: true
      };
    case types.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer