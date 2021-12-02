import React, { useState, useEffect } from "react";

import TableComponents from "./Table";

const ShopHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await fetch(
      `http://localhost:3001/selling-posts?userId=${user.id}`
    );
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className="shop container mt-4 ">
      <header>
        <h2>Shop History</h2>
      </header>
      <div className="shop__purchases">
        <h3 className="mt-4 shop__purchases__title">Posted Products</h3>
        <div className="items__box">
          <TableComponents products={products} trColor="head__tr--primary" />
        </div>
      </div>
    </section>
  );
};

export default ShopHistory;
