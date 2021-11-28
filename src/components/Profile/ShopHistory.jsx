import React, { useState } from "react";

import TableComponents from "./Table";


import lap1 from "../../assets/image/lap1.jpg";
import lap2 from "../../assets/image/lap2.jpg";
import lap3 from "../../assets/image/lap3.jpg";

const ShopHistory = () => {
  const [images, setImages] = useState([{img: lap1, title : "lenovo", price: "120$"}, {img: lap2, title : "lenovo", price: "120$"},{img: lap3, title : "lenovo", price: "120$"}, {img: lap2, title : "lenovo", price: "120$"}, {img: lap1, title : "lenovo", price: "120$"}])

  return (
    <section className="shop container mt-4 ">
      <header>
        <h2>Shop activity</h2>
      </header>
    <div className="shop__purchases">
      <h3 className="mt-4 shop__purchases__title">Posted Products</h3>
      <div className="items__box">
      <TableComponents  images={images} trColor="head__tr--primary" />
     </div>

      </div>

    </section>
  );
};

export default ShopHistory;
