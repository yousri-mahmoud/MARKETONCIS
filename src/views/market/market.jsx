import React from "react";
import buy from "../../assets/image/buy.jpg";
import sell from "../../assets/image/sell.jpg";
import Buy from "./buy";
import Sell from "./sell";
import { Routes, Route } from "react-router-dom";
function Market() {
  return (
    <>
      <section className="market">
        <div className="container py-5">
          <div className="row">
            <div className="col buy">
              <img className="w-100" src={buy} alt="" />
              <h4>buy your new device</h4>
            </div>
            <div className="col-lg-6 sell">
              {" "}
              <img className="w-100" src={sell} alt="" />
              <h4>sell your old device</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Market;
