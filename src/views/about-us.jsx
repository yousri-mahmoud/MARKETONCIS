import React from "react";
import { FaLinkedin } from "react-icons/fa";
import img from "../assets/image/user.jpg";
function About() {
  return (
    <div className="about text-center mt-4 container">
      <header className="about__header"></header>

      <div className="about__content">
        <div className="about__content__about">
          <h2 className="me-3">About Us</h2>
          <p className="w-75 m-auto">
            We are a group of ITI students. We created this website as a
            graduation project for us, and we hope  this website will be a
            screen for our skills
          </p>
        </div>
        <div className="about__content__team mt-3">
          <h2>Our Team</h2>
          <div className="d-flex  justify-content-center">
            <div className="about__content__team__box">
              <img src={img} alt="me" />
              <div className="about__content__team__box__info">
                <h3 className="me-3">Yousri Mahmoud</h3>
                <FaLinkedin className="about__content__team__box__info__icon" />
              </div>
            </div>
            <div className="about__content__team__box">
              <img src={img} alt="me" />

              <div className="about__content__team__box__info">
                <h3 className="me-3">Saif Alaa</h3>
                <FaLinkedin className="about__content__team__box__info__icon" />
              </div>
            </div>
            <div className="about__content__team__box">
              <img src={img} alt="me" />

              <div className="about__content__team__box__info">
                <h3>Saleh Farag</h3>
                <FaLinkedin className="about__content__team__box__info__icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
