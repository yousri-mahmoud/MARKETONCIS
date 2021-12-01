import { combineReducers } from "redux";
import marketReducer from "./marketReducer";
import authReducer from "./authReducer";
import { PostReducer } from "./PostReducer";
import { CommentReducer } from "./commentReducer";
import { whishReducer } from "./whishReducer";
export default combineReducers({
  auth: authReducer,
  post: PostReducer,
  comment: CommentReducer,
  market: marketReducer,
  whish: whishReducer,
});
