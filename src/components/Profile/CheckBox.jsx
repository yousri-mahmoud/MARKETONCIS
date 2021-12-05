import React, { useState, useEffect } from "react";

function CheckBox({ item }) {
  const [isSold, setIsSold] = useState(item.sold);
  const patchSold = async () => {
    await fetch(`http://localhost:3001/selling-posts/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sold: isSold }),
    });
  };
  useEffect(() => {
    patchSold();
  }, [isSold]);
  return (
    <div className="d-flex justify-content-between align-items-center">
      <label htmlFor="soldCheck"> Item sold</label>

      <input
        onClick={() => setIsSold(!isSold)}
        className="checkBox ms-4"
        type="checkBox"
        id="soldCheck"
        name="soldCheck"
        checked={isSold}
      />
    </div>
  );
}

export default CheckBox;
