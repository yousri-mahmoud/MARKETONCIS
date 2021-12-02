import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";
import { FormControl } from "react-bootstrap";

import { AddWhish } from "./../../redux/actions/whishAction";
function Products() {
  const typesFilter = ["all", "laptop", "pc", "mobile", "accessories"];
  const staticImageUrl =
    'https://www.slashgear.com/wp-content/uploads/2018/02/microsoft-surface-laptop-review-0-980x620.jpg"';
  const state = useSelector((state) => state.market);
  const whishes = useSelector((wish) => wish.whish);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [devices, setDevices] = useState([]);
  const [activeFilter, setActiceFilter] = useState(0);
  const [userId, setUserId] = useState("");
  const [wList, setWList] = useState([]);
  const [list, setList] = useState([]);
  const [itemsId, setItemsId] = useState([]);
  const getData = async () => {
    const response = await fetch("http://localhost:3001/selling-posts");
    const data = await response.json();
    setDevices(data);
  };
  const handelFilter = (filterName) => {
    if (filterName === "all") {
      getData();
    } else {
      queryParamsFilter(filterName);
    }
  };
  const queryParamsFilter = async (filterName) => {
    const response = await fetch(
      `http://localhost:3001/selling-posts?deviceDetail.deviceType=${filterName}`
    );
    const data = await response.json();
    setDevices(data);
  };
  const handelSearch = async () => {
    if (activeFilter === 0) {
      const response = await fetch(
        `http://localhost:3001/selling-posts?q=${searchText}`
      );
      const data = await response.json();
      setDevices(data);
    } else {
      const activeType = typesFilter[activeFilter];
      const res = await fetch(
        `http://localhost:3001/selling-posts?deviceDetail.deviceType=${activeType}&q=${searchText}`
      );
      const newData = await res.json();
      setDevices(newData);
    }
  };
  useEffect(() => {
    let user = localStorage.getItem("user");
    setUserId(JSON.parse(user).id);
    console.log(userId);
    fetchList();
  }, [whishes]);
  useEffect(() => {
    getData();
  }, [state]);

  const handleWhish = async (item) => {
    console.log(item);
    dispatch(
      AddWhish({
        deviceInfo: item.deviceDetail,
        userId: userId,
        postedById: item.userId,
        userName: item.userName,
        imageUrl: item.imageUrl,
        itemId: item.id,
      })
    );
  };

  useEffect(() => {
    console.log(list);
    let updatedList = list?.filter((whish) => {
      return whish.userId === userId;
    });
    setWList(updatedList);
  }, [list]);
  useEffect(() => {
    console.log(wList);
    let newItemsID = wList.map((item) => item.itemId);
    setItemsId(newItemsID);
    console.log(itemsId);
  }, [wList]);
  const fetchList = async () => {
    const commentsResponse = await fetch("http://localhost:3001/whishList")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
    console.log(whishes);
  };
  const handleDeleteWhish = async (item) => {
    let deletedId = wList.filter((it) => {
      console.log(it, item);
      return it.itemId === item.id;
    });
    console.log(deletedId);
    const response = await fetch(
      `http://localhost:3001/whishList/${deletedId[0].id}`,
      {
        method: "DELETE",
      }
    );
    console.log(deletedId);
    fetchList();
  };
  return (
    <>
      <div className="category">
        <h3>CATEGORIES</h3>
        <div className="search d-flex justify-content-center ">
          {search ? (
            <>
              <div className="d-flex ">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mx-3 search_input"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    handelSearch();
                  }}
                />
                <FaRegTimesCircle
                  className="closeSearch_icon"
                  onClick={() => setSearch(false)}
                />
              </div>
            </>
          ) : (
            <FaSearch className="search_icon" onClick={() => setSearch(true)} />
          )}
        </div>
        <ul>
          {typesFilter.map((item, index) => (
            <li
              className={`${activeFilter === index ? "active_filter" : ""}`}
              onClick={() => {
                handelFilter(item);
                setActiceFilter(index);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="row products">
        {devices.map((item) => {
          return (
            <div key={item.id} className="col-4 my-2">
              <Card className="position-relative">
                {itemsId.includes(item.id) ? (
                  <AiFillStar
                    onClick={() => handleDeleteWhish(item)}
                    className="position-absolute top-0 end-0 text-warning"
                  />
                ) : (
                  <AiOutlineStar
                    onClick={() => handleWhish(item)}
                    className="position-absolute top-0 end-0 text-warning"
                  />
                )}

                <Link to={`/market/buy/${item.id}`}>
                  <Card.Img variant="top" src={item.imageUrl} />
                </Link>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    {item.deviceDetail.deviceName}{" "}
                    <small className="text-danger">
                      {item.deviceDetail.devicePrice} EGP
                    </small>
                  </Card.Title>

                  <Card.Text>{item.deviceDetail.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    posted by :{" "}
                    <Link to={`/globalProfile/${item.userId}`}>
                      {item.userName}
                    </Link>
                  </small>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Products;
