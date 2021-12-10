import React from "react";
import sliderOne from "../assets/image/slider_one.PNG";
import sliderTwo from "../assets/image/slider_two.PNG";
import sliderThree from "../assets/image/slider_three.PNG";
import sliderFour from "../assets/image/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div className="home text-center gap">
        <header className="home__header">
          <h1>M A R K E T O N I C S</h1>
          <p className="">
            It is a website that helps you to buy or sell used devices and also
            allows you to join to our blog to give your opinion on the products
          </p>
        </header>
      </div>
      <div className="container slide">
        <Carousel className="border slider_shadow" variant="dark">
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-75 mx-auto up slider_img"
              src={sliderFour}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Just What You Need And Nothing More</h5>
              <p>Join Us Now</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 slider_img"
              src={sliderOne}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Join our community</h5>
              <p>You will find the answers you are looking for and more</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 slider_img"
              src={sliderTwo}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Market</h5>
              <p>Where you could Buy/Sell your devices</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 slider_img"
              src={sliderThree}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Profile</h5>
              <p>
                Your history of shopping, Blog activity, Bio and Profile picture
                in one Place
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="home text-center">
        <div className="home__content__register mt-4">
          {isLoggedIn ? (
            <h3 className="p-3">Thanks For Joining Our Journey</h3>
          ) : (
            <h3 className="p-3">
              Be One Of Our Family{" "}
              <NavLink className="" to="/register">
                Register
              </NavLink>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
