import { POSTCOMMENT } from "./actionsType";
const PostComment = (body) => {
  return {
    type: POSTCOMMENT,
    payload: body,
  };
};
export const CommentInfo = (body) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/comments", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(PostComment(data));
    }
  };
};
