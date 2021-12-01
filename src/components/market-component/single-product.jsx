import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddWhish } from "./../../redux/actions/whishAction";
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
  const dispatch = useDispatch();
  const [device, setDevice] = useState(initailValue);
  const [wList, setWList] = useState([]);
  const [list, setList] = useState([]);
  const [itemsId, setItemsId] = useState([]);
  const whishes = useSelector((wish) => wish.whish);
  let { id } = useParams();
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/selling-posts/${id}`);
    const data = await response.json();
    setDevice(data);
  };
  const getWishes = async () => {
    const response = await fetch(`http://localhost:3001/whishList`)
      .then((res) => res.json())
      .then((list) => setList(list));
  };
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    getWishes();
  }, [whishes]);
  useEffect(() => {
    let updatedList = list?.filter((whish) => {
      return whish.userId === device.userId;
    });
    setWList(updatedList);
  }, [list]);
  useEffect(() => {
    let newItemsID = wList.map((item) => item.itemId);
    setItemsId(newItemsID);
  }, [wList]);
  const handleWhish = async (item) => {
    dispatch(
      AddWhish({
        deviceInfo: item.deviceDetail,
        userId: item.userId,
        itemId: item.id,
      })
    );
  };
  const handleDeleteWhish = async (item) => {
    let deletedId = wList.filter((it) => it.itemId === item.id);
    const response = await fetch(
      `http://localhost:3001/whishList/${deletedId[0].id}`,
      {
        method: "DELETE",
      }
    );
    getWishes();
  };
  return (
    <>
      <div className="container product">
        <section class="about_product position-relative">
          {itemsId.includes(parseInt(id)) ? (
            <AiFillStar
              onClick={() => handleDeleteWhish(device)}
              className="text-warning position-absolute top-0 end-0 "
            />
          ) : (
            <AiOutlineStar
              onClick={() => handleWhish(device)}
              className="text-warning position-absolute top-0 end-0 "
            />
          )}
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
