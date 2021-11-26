import { REGISTERSUCCESS, REGISTERERROR } from "./actionsType";
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
