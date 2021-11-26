import { POSTTOPIC } from "./actionsType";
const PostTopic = (topic) => {
  return {
    type: POSTTOPIC,
    payload: topic,
  };
};
export const PostInfo = (topic) => {
  console.log(topic);
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      body: JSON.stringify(topic),
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
