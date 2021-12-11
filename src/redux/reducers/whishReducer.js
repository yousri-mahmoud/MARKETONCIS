export const whishReducer = (state = [{}], action) => {
  switch (action.type) {
    case "ADDWHISH":
      return [
        ...state,
        {
          deviceInfo: action.payload.deviceInfo,
          userId: action.payload.userId,
          itemId: action.payload.itemId,
        },
      ];
    default:
      return state;
  }
};
