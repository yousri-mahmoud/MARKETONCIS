import { SELLINGDEVICE } from "./actionsType";

const newDevice = (payload) => {
  return {
    type: SELLINGDEVICE,
    payload,
  };
};

export const postNewDevice = (device, url, rest) => {
  console.log("url " + url);
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:3001/selling-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceDetail: device,
        email: user.email,
        imageUrl: url.length > 0 ? url : rest[0],
        images: rest,
        userId: user.id,
        userName: ` ${user.firstName} ${user.lastName}`,
        sold: false,
        discount: false,
      }),
    });
    const data = await response.json();
    dispatch(newDevice(data));
  };
};
