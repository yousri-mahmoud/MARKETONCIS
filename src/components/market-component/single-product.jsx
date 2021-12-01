import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
function SingleProduct() {
  const staticImageUrl =
    'https://www.slashgear.com/wp-content/uploads/2018/02/microsoft-surface-laptop-review-0-980x620.jpg"';
  const initailValue = {
    deviceDetail: {
      deviceName: "",
      deviceType: "",
      description: "",
      images: "",
      devicePrice: "",
      devicePlace: "",
      name: "",
      phone: "",
      email: "",
    },
    userId: "",
    id: "",
  };
  const [device, setDevice] = useState(initailValue);

  let { id } = useParams();
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/selling-posts/${id}`);
    const data = await response.json();
    setDevice(data);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <div className="container product">
        <section class="about_product position-relative">
          <AiOutlineStar className="position-absolute top-0 end-0 text-black" />
          <div class="productImg">
            <img src={staticImageUrl} alt="" />
          </div>

          <div class="details">
            <h6>{device.deviceDetail.deviceType}</h6>
            <div className="d-flex justify-content-between align-items-start">
              <h2>{device.deviceDetail.deviceName}</h2>

              <div class="price">{device.deviceDetail.devicePrice} EGP</div>
            </div>
            <p>{device.deviceDetail.description}</p>
            <small className="text-muted">
              posted by :
              <Link to={`/globalProfile/${device.userId}`}>
                {device.userName}
              </Link>
            </small>
            <small className="text-muted">
              place : {device.deviceDetail.devicePlace}
            </small>{" "}
            <small className="text-muted">
              phone : {device.deviceDetail.phone}
            </small>
          </div>
        </section>
      </div>
    </>
  );
}

export default SingleProduct;
