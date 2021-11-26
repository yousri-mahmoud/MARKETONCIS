import React from "react";

import Products from "../../components/market-component/products";
import Category from "../../components/market-component/category";

function Buy() {
  return (
    <div className="container py-5">
      <Category />
      <Products />
    </div>
  );
}

export default Buy;
