import React from "react";
import profile from "../assets/image/profile.png";
import blog from "../assets/image/blog.png";
import buyAndSell from "../assets/image/BuyandSell.png";
import { NavLink } from "react-router-dom";


const home = () => {
  return (
    <div className="home text-center">
      <header className="home__header">
        <h1>MARKTONCIS</h1>
        <p className="w-50">
          It is a website that helps you to buy or sell used devices and also
          allows you to join to our blog to give your opinion on the products
        </p>
      </header>
      <div className="home__content">
        <h2 >
          What You Can Do in <span>MARKTONCIS  ?</span>
        </h2>
        <div className="home__content__buy">
          <h3>
            you can bay and sell from the <span> market </span>
          </h3>
          <img className="" src={buyAndSell} alt="buyAndSell" />
        </div>

        <div className="home__content__blog mt-4">
          <h3>
            You Can Viset Our <span>Blog</span>
          </h3>
          <img className="" src={blog} alt="blog" />
        </div>
        <div className="home__content__profile mt-4">
          <h3>
          You will have a personal <span>Profile</span>
          </h3>
          <img className="" src={profile} alt="buyAndSell" />
        </div>
        <div className="home__content__register mt-4">
          <h3 className="p-3">
          Be One Of Our Family <NavLink className="" to="/register">
                             Register
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default home;
