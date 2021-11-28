import React from "react";
import { FaLinkedin} from "react-icons/fa";


function About() {
  return (
    <div className="about text-center mt-4">
      <header className="about__header"></header>

      <div className="about__content">
        <div className="about__content__team">
          <h2 className="me-3">About Us</h2>
          <p className="w-50 m-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut,
            excepturi consequuntur nobis saepe autem qui sunt exercitationem
            beatae atque optio voluptas dicta sequi delectus officia debitis sit
            mollitia. Quas, hic.
          </p>
        </div>
        <div className="about__content__team mt-3">
          <h2>Our Team</h2>
          <div className="d-flex  justify-content-center">
            <div>
              <h3 className="me-3">Yousri Mahmoud</h3>
              <FaLinkedin color="red"/>
            </div>
            <div>
              <h3 className="me-3">Saif Alaa</h3>
              <FaLinkedin color="red"/>

            </div>
            <div>
              <h3>Saleh Farag</h3>
              <FaLinkedin color="red"/>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
