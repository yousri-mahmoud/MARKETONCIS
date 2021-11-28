import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaSearch, FaRegTimesCircle } from "react-icons/fa";
import { FormControl } from "react-bootstrap";
function Products() {
  const typesFilter = ["all", "laptop", "pc", "mobile", "accessories"];
  const staticImageUrl =
    'https://www.slashgear.com/wp-content/uploads/2018/02/microsoft-surface-laptop-review-0-980x620.jpg"';
  const state = useSelector((state) => state.market);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [devices, setDevices] = useState([]);
  const [activeFilter, setActiceFilter] = useState(0);
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
    getData();
  }, [state]);
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
                <AiOutlineStar className="position-absolute top-0 end-0" />
                <Link to={`/market/buy/${item.id}`}>
                  <Card.Img variant="top" src={staticImageUrl} />
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
                    <Link to={`/profile/${item.userId}`}>{item.userName}</Link>
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
