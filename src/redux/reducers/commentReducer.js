export const CommentReducer = (state = [{}], action) => {
  console.log(state);
  switch (action.type) {
    case "POSTCOMMENT":
      return [
        ...state,
        {
          postId: action.payload.postId,
          author: action.payload.author,
          comment: action.payload.comment,
        },
      ];
    default:
      return state;
  }
};
