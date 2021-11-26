import React from "react";
import lap1 from "../../assets/image/lap1.jpg";
import lap2 from "../../assets/image/lap2.jpg";
import lap3 from "../../assets/image/lap3.jpg";
const Whislist = () => {
  return (
    <section className="whislist mt-4 w-75 m-auto">
      <header>
        <h2>My Wishlist</h2>
      </header>
      <div className="whislist__content mt-4">
        <div className="whislist__content__box  d-flex align-items-center justify-content-around">
          <div className="whislist__content__box__info d-flex align-items-center">
            <figure>
              <img src={lap1} className="" alt="lap" />
            </figure>
            <div>
              <h5>Lenovo</h5>
              <h6 className="mt-4">Posted by</h6>
              <h6 className="whislist__content__box__info__user">
                maged ahmed
              </h6>
            </div>
          </div>

          <p className="whislist__content__box__price">120$</p>
          <button className="btn btn-danger">DELETE</button>
        </div>
      </div>

      <div className="whislist__content mt-4">
        <div className="whislist__content__box  d-flex align-items-center justify-content-around">
          <div className="whislist__content__box__info d-flex align-items-center">
            <figure>
              <img src={lap2} className="" alt="lap" />
            </figure>
            <div>
              <h5>Lenovo</h5>
              <h6 className="mt-4">Posted by</h6>
              <h6 className="whislist__content__box__info__user">
                maged ahmed
              </h6>
            </div>
          </div>

          <p className="whislist__content__box__price">120$</p>
          <button className="btn btn-danger">DELETE</button>
        </div>
      </div>

      <div className="whislist__content mt-4">
        <div className="whislist__content__box  d-flex align-items-center justify-content-around">
          <div className="whislist__content__box__info d-flex align-items-center">
            <figure>
              <img src={lap3} className="" alt="lap" />
            </figure>
            <div>
              <h5>Lenovo</h5>
              <h6 className="mt-4">Posted by</h6>
              <h6 className="whislist__content__box__info__user">
                maged ahmed
              </h6>
            </div>
          </div>

          <p className="whislist__content__box__price">120$</p>
          <button className="btn btn-danger">DELETE</button>
        </div>
      </div>
    </section>
  );
};

export default Whislist;
