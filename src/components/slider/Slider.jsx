import React from "react";
import { Carousel } from "react-bootstrap";
import profile from "../../assets/image/profile.png";
import blog from "../../assets/image/blog.png";
import buyAndSell from "../../assets/image/BuyandSell.png";

const Slider = () => {
  return (
    <div>
      <Carousel className="slider">
        <Carousel.Item className="">
          <img
            className="d-block slider__img"
            src={blog}
            alt="First slide"
          />
          <Carousel.Caption>
      
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block slider__img"
            src={profile}
            alt="Second slide"
          />

          <Carousel.Caption>
           
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block slider__img"
            src={buyAndSell}
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
