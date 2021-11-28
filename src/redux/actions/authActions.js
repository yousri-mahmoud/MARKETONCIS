import {
  REGISTERSUCCESS,
  REGISTERERROR,
  LOGINGSUCCESS,
  LOGINERROR,
} from "./actionsType";
// REGISTER FUN
export const registerSuccess = (user) => {
  return {
    type: REGISTERSUCCESS,
    payload: user,
  };
};
export const registerError = (error) => {
  return {
    type: REGISTERERROR,
    payload: error,
  };
};
export const userRegister = (userData) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(registerSuccess(data));
    } else {
      dispatch(registerError(data));
    }
  };
};

// LOGIN FUN
export const loginSuccess = (user) => {
  return {
    type: LOGINGSUCCESS,
    payload: user,
  };
};
export const loginError = (error) => {
  return {
    type: LOGINERROR,
    payload: error,
  };
};
export const userLogin = (userData) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/signin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      dispatch(loginError(data));
    }
  };
};
//Bio
