import React from "react";
import {Helmet} from "react-helmet";


import Products from "../../components/market-component/products";

function Buy() {
  return (
    <div className="container buyBox py-5">
           <Helmet>
                <meta charSet="utf-8" />
                <title>Market</title>
                <meta name="description" content="MARKETONICS has a variety of electronic items for sale between laptops, mobiles,"/>

            </Helmet>
      <Products />
    </div>
  );
}

export default Buy;
