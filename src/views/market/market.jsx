import React from "react";
import buy from "../../assets/image/buy.jpg";
import sell from "../../assets/image/sell.jpg";

import { Link } from "react-router-dom";
function Market() {
  return (
    <>
      <section className="market gap">
        <div className="container py-5">
          <div className="row">
            <div className="col buy">
              <Link to="/market/buy">
                <img className="w-100 " src={buy} alt="" />
              </Link>
              <h4>buy your new device</h4>
            </div>
            <div className="col sell">
              {" "}
              <Link to="/market/sell">
                <img className="w-100 " src={sell} alt="" />
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
