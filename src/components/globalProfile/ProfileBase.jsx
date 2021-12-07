import React, { useEffect, useState } from "react";

import { NavLink, Outlet, useParams } from "react-router-dom";

import man from "../../assets/image/man.jpg";
import woman from "../../assets/image/woman.jpg";
const ProfileBase = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [text, setText] = useState("");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users?id=${id}`);
    const data = await response.json();
    const findUser = data.find((user) => user.id == id);
    setUser(findUser);
  };
  let avatar = "";
  if (user.gender === "male") avatar = man;
  if (user.gender === "female") avatar = woman;

  const getBio = async () => {
    const response = await fetch(`http://localhost:3001/bio`);
    const data = await response.json();
    const findBio = data.find((bio) => bio.userId == id);
    setText(findBio?.textBio);
  };

  useEffect(() => {
    getUser();
    getBio();
  }, []);
  return (
    <section className="user gap">
      <div className="row user__content">
        <div className="col-lg-2  col-md-12 col-sm-12   user__content__sections">
          <figure className="text-center mt-5 mb-2">
            <img
              className="user__content__sections__img rounded-circle"
              src={user.profileImg ? user.profileImg : avatar}
              alt="user"
            />
            <figcaption>
              <h3 className="text-center">{`${user.firstName} ${user.lastName} `}</h3>
            </figcaption>
          </figure>
          <ul className="mt-5">
            <li>
              <NavLink
                end
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`/globalProfile/${id}`}
              >
                <span>|</span> Shop history{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to={`/globalProfile/${id}/activity`}
              >
                <span>|</span>Blog activity{" "}
              </NavLink>
            </li>
            <li></li>
          </ul>
        </div>
        <div className="col-lg-8 col-md-12 order-md-3 order-sm-3 order-2">
          <Outlet />
        </div>
        <div className="col-lg-2 col-md-12  order-md-2   order-lg-3   px-2 text-center user__content__biography ">
          <div className="user__content__biography__box">
            <div>
              <p className="user__content__biography__box__paragraph position-relative">
                <h3 className="mt-5 mb-2">BIOGRAPHY</h3>
                {text}
              </p>
            </div>
            <div className="user__content__biography__box__location">
              <h3>LOCATION</h3>
              <p>{user.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBase;
