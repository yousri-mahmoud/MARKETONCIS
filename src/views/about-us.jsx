import React from "react";
import { FaLinkedin } from "react-icons/fa";
import saleh from "../assets/image/saleh.jpg";
import user from "../assets/image/user.jpg";

import Yousri from "../assets/image/yousri.jpeg";
import {Helmet} from "react-helmet";




function About() {
  return (
    <div className="about  text-center mt-4 container">
          <Helmet>
                <meta charSet="utf-8" />
                <title>About-us</title>
            </Helmet>
      
      <header className="about__header"></header>

      <div className="about__content gap">
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
          <div className="row  justify-content-center">
            <div className="about__content__team__box col-lg-3">
              <img src={Yousri} alt="me" />
              <div className="about__content__team__box__info">
                <h3 className="me-3">Yousri Mahmoud</h3>
                <a target="blank"  href="https://www.linkedin.com/in/yousri-mahmoud-6ab298214/">
                <FaLinkedin className="about__content__team__box__info__icon" />
                </a>
              </div>
            </div>
            <div className="about__content__team__box col-lg-3">
              <img src={user} alt="me" />

              <div className="about__content__team__box__info">
                <h3 className="me-3">Saif Alaa</h3>
                <a target="blank"  href="https://www.linkedin.com/in/saif-alaa-eldin/">
                <FaLinkedin className="about__content__team__box__info__icon" />
                </a>
              </div>
            </div>
            <div className="about__content__team__box col-lg-3">
              <img src={saleh} alt="saleh" />

              <div className="about__content__team__box__info">
                <h3>Saleh Farag</h3>
                <a target="blank"  href="https://www.linkedin.com/in/saleh-farag/">
                <FaLinkedin className="about__content__team__box__info__icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
