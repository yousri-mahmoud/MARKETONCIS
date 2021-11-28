import { SELLINGDEVICE } from "../actions/actionsType";

const marketReducer = (state = { userSellingPosts: [] }, action) => {
  switch (action.type) {
    case SELLINGDEVICE:
      return {
        ...state,
        userSellingPosts: [...state.userSellingPosts, action.payload],
      };
    default:
      return state;
  }
};
export default marketReducer;
