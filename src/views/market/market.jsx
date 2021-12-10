import React from "react";
import buy from "../../assets/image/buy.jpg";
import sell from "../../assets/image/sell.jpg";
import {Helmet} from "react-helmet";


import { Link } from "react-router-dom";
function Market() {
  return (
    <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Market</title>
            </Helmet>
      <section className="market gap">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg mb-5 col-md-12 buy">
              <Link to="/market/buy">
                <img className="w-100 " src={buy} alt="" />
              </Link>
              <h4>buy your new device</h4>
            </div>
            <div className="col-lg col-md-12 sell">
              {" "}
              <Link to="/market/sell">
                <img className="w-100" src={sell} alt="" />
              </Link>
              <h4>sell your old device</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Market;
