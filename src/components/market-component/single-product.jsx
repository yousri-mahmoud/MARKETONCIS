import React from "react";

import data from "../../data.json";
import { useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
function SingleProduct() {
  const { id } = useParams();
  const product = data.find((item) => item.id == id);
  console.log(id, product);
  return (
    <>
      <div className="container product">
        <section class="about_product position-relative">
          <AiOutlineStar className="position-absolute top-0 end-0 text-black" />
          <div class="productImg">
            <img src={product.images} alt="" />
          </div>

          <div class="details">
            <h6>{product.deviceType}</h6>
            <div className="d-flex justify-content-between align-items-start">
              <h2>{product.deviceName}</h2>

              <div class="price">{product.devicePrice} EGP</div>
            </div>
            <p>{product.description}</p>
            <small className="text-muted">posted by : {product.name}</small>
            <small className="text-muted">
              place : {product.devicePlace}
            </small>{" "}
            <small className="text-muted">phone : {product.phone}</small>
          </div>
        </section>
      </div>
    </>
  );
}

export default SingleProduct;
