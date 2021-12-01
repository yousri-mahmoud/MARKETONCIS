import { ADDWHISH } from "./actionsType";
const PostTopic = (topic) => {
  return {
    type: ADDWHISH,
    payload: topic,
  };
};
export const AddWhish = (whish) => {
  //   console.log(topic);
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/whishList", {
      method: "POST",
      body: JSON.stringify(whish),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(PostTopic(data));
    }
  };
};
