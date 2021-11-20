import React, { useState } from "react";

import GliderComponent from "./Glider";


import lap1 from "../../assets/image/lap1.jpg";
import lap2 from "../../assets/image/lap2.jpg";
import lap3 from "../../assets/image/lap3.jpg";

const ShopHistory = () => {
  const [images, setImages] = useState([{img: lap1, title : "lenovo", price: "120$"}, {img: lap2, title : "lenovo", price: "120$"},{img: lap3, title : "lenovo", price: "120$"}, {img: lap2, title : "lenovo", price: "120$"}, {img: lap1, title : "lenovo", price: "120$"}])

  return (
    <section className="shop container mt-4 ">
      <header>
        <h2>Shop history</h2>
      </header>
    <div className="shop__purchases">
      <h3 className="mt-4">Purchases</h3>
      <div className="items__box">
      <GliderComponent  images={images} ToShow={3} />
     </div>

      </div>

      <div className="shop__sales">
      <h3>Sales</h3>
      <div className="items__box">
      <GliderComponent images={images} ToShow={3} />
      </div>

      </div>
    </section>
  );
};

export default ShopHistory;
