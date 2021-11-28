import { SELLINGDEVICE } from "./actionsType";

const newDevice = (payload) => {
  return {
    type: SELLINGDEVICE,
    payload,
  };
};

export const postNewDevice = (device) => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:3001/selling-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceDetail: device,
        userId: user.id,
        userName: ` ${user.firstName} ${user.lastName}`,
      }),
    });
    const data = await response.json();
    dispatch(newDevice(data));
  };
};
