import React, { useState, useEffect } from "react";
import lap1 from "../../assets/image/lap1.jpg";
import lap2 from "../../assets/image/lap2.jpg";
import lap3 from "../../assets/image/lap3.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Whislist = () => {
  const whishes = useSelector((wish) => wish.whish);
  const [wList, setWList] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    fetchList();
  }, [userId]);
  useEffect(() => {
    console.log(wList);
  }, [wList]);
  const fetchList = async () => {
    let user = localStorage.getItem("user");
    setUserId(JSON.parse(user).id);
    const commentsResponse = await fetch("http://localhost:3001/whishList")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, userId);
        let updatedList = data?.filter((whish) => {
          return whish.userId === userId;
        });
        console.log(updatedList);
        setWList(updatedList);
      });
    // console.log(wList);
  };
  const handleDelete = async (item) => {
    console.log(item);
    // let deletedId = wList.filter((it) => it.itemId === item.id);
    const response = await fetch(`http://localhost:3001/whishList/${item.id}`, {
      method: "DELETE",
    });
    // console.log(deletedId);
    fetchList();
  };
  return (
    <section className="whislist mt-4 w-75 m-auto">
      <header>
        <h2>My Wishlist</h2>
      </header>
      {wList.map((item, index) => (
        <Link
          to={`/market/buy/${item.itemId}`}
          key={index}
          className="whislist__content mt-4"
        >
          <div className="whislist__content__box  d-flex align-items-center justify-content-around">
            <div className="whislist__content__box__info d-flex align-items-center">
              <figure>
                <img src={item.imageUrl} className="" alt="lap" />
              </figure>
              <div>
                <h5>{item.deviceInfo.deviceName}</h5>
                <h6 className="mt-4">Posted by</h6>
                <h6 className="whislist__content__box__info__user">
                  <Link to={`/globalProfile/${item.postedById}`}>
                    {item.userName}
                  </Link>
                </h6>
              </div>
            </div>

            <p className="whislist__content__box__price">
              {item.deviceInfo.devicePrice}
            </p>
            <button
              onClick={() => handleDelete(item)}
              className="btn btn-danger"
            >
              DELETE
            </button>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Whislist;
