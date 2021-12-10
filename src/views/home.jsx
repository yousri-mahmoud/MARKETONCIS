import React from "react";
import sliderOne from "../assets/image/slider_one.PNG";
import sliderTwo from "../assets/image/slider_two.PNG";
import sliderThree from "../assets/image/slider_three.PNG";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogIn);

  return (
    <div>
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
              className="d-block w-100 slider_img"
              src={sliderOne}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Blog</h5>
              <p>Lorem ipsum dolor sit amet.</p>
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
