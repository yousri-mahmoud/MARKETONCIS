import {
  REGISTERSUCCESS,
  REGISTERERROR,
  LOGINERROR,
  LOGINGSUCCESS,
  LOGOUT,
} from "../actions/actionsType";
const initailToken = localStorage.getItem("token");

const authReducer = (
  state = { user: null, message: null, token: null, isLogIn: !!initailToken },
  action
) => {
  switch (action.type) {
    case REGISTERSUCCESS:
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.accessToken,
        isLogIn: true,
      };
    case REGISTERERROR:
      return { ...state, message: action.payload };
    case LOGINGSUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.accessToken);
      return {
        ...state,

        user: action.payload.user,
        token: action.payload.accessToken,
        isLogIn: true,
      };
    case LOGINERROR:
      return { ...state, message: action.payload };
    case LOGOUT:
      localStorage.clear("user");
      localStorage.clear("token");
      return { ...state, isLogIn: false };
    default:
      return state;
  }
};

export default authReducer;
