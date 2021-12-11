export const PostReducer = (state = [{}], action) => {
  switch (action.type) {
    case "POSTTOPIC":
      return [
        ...state,
        { title: action.payload.title, desc: action.payload.desc },
      ];
    default:
      return state;
  }
};
