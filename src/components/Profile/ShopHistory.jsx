import React, { useState, useEffect } from "react";
import Loading from "../../shared/Loading";
import TableComponents from "./Table";

const ShopHistory = () => {
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/selling-posts?userId=${user.id}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));
  };
  useEffect(() => {
    setIsProfileLoading(true);
    getProducts();
  }, []);
  return (
    <section className="shop container mt-4 ">
      <header>
        <h2>Shop History</h2>
      </header>
      {isProfileLoading ? (
        <Loading />
      ) : (
        <div className="shop__purchases">
          <h3 className="mt-4 shop__purchases__title">Posted Products</h3>
          <div className="items__box">
            <TableComponents products={products} trColor="head__tr--primary" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopHistory;
