import { REGISTERSUCCESS, REGISTERERROR } from "../actions/actionsType";

const authReducer = (
  state = { user: null, message: null, token: "" },
  action
) => {
  switch (action.type) {
    case REGISTERSUCCESS:
      return { ...state, message: "success register", user: action.payload };
    case REGISTERERROR:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default authReducer;
