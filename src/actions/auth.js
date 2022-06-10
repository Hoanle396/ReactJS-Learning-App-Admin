import * as types from "./types";
const userLogin = username => ({
  type: types.AUTH_LOGIN,
  username,
});

const userLogout = () => ({
  type: types.AUTH_LOGOUT,
});

export const doLogin = username => async dispatch => {
    dispatch(userLogin(username));
};

export const doLogout = () => dispatch => {
  dispatch(userLogout());
};
