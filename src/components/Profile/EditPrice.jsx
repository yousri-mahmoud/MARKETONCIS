import React, { useState } from "react";
import { Button } from "react-bootstrap";
function EditPrice({ item }) {
  const [isDiscount, setIsDiscount] = useState(item.discount);
  const [isOffer, setIsOffer] = useState(false);
  const [newPrice, setNewPrice] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3001/selling-posts/${item.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount: newPrice }),
      }
    );
    const data = await response.json();

    setIsDiscount(data.discount);
    setIsOffer(false);
  };
  return (
    <>
      <div className={isDiscount ? "text-decoration-line-through" : ""}>
        {item.deviceDetail.devicePrice} EGP{" "}
      </div>
      {isDiscount && (
        <div>
          {" "}
          offer : <span className="text-success">{isDiscount} EGP</span>{" "}
        </div>
      )}
      <Button
        onClick={() => setIsOffer(!isOffer)}
        className="mt-3 mb-3 add new-offer text-white d-block"
        variant=""
      >
        new offer
      </Button>

      {isOffer && (
        <form className="d-flex" onSubmit={handelSubmit}>
          <input
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            type="number"
            className="w-75"
            placeholder="add new price"
            required
          />
          <Button className="add-offer add" type="submit" variant="">
            add
          </Button>
        </form>
      )}
    </>
  );
}

export default EditPrice;
