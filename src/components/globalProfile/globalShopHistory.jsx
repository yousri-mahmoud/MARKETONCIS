import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TableComponents from "./Table";

const GlobalShopHistory = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const res = await fetch(`http://localhost:3001/selling-posts?userId=${id}`);
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className="shop container mt-4 ">
      <header>
        <h2>Shop history</h2>
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

export default GlobalShopHistory;
