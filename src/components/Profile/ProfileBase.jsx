import React, { useEffect, useState, useRef } from "react";
import img from "../../assets/image/user.jpg";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import man from "../../assets/image/man.jpg";
import woman from "../../assets/image/woman.jpg";
const ProfileBase = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let avatar = "";
  if (user.gender === "male") avatar = man;
  if (user.gender === "female") avatar = woman;

  const [userBio, setUserBio] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const bio = useRef(null);
  const handelBioSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editBioRequest(bio.current.value);
    } else {
      postBio(bio.current.value);
    }
  };
  // get
  const getBio = async () => {
    const response = await fetch("http://localhost:3001/bio");
    const data = await response.json();
    const filterData = data.find((bio) => bio.userId == user.id) || "";
    setUserBio(filterData);
    setText(filterData.textBio);
  };
  //post
  const postBio = async (textBio) => {
    const response = await fetch("http://localhost:3001/bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textBio, userId: user.id }),
    });
    const data = await response.json();

    setText(data.textBio);
  };
  //edit
  const editBio = () => {
    setIsEditing(true);
    setText("");
  };
  //edit request
  const editBioRequest = async (editedBio) => {
    const response = await fetch(`http://localhost:3001/bio/${userBio.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textBio: editedBio }),
    });
    const data = await response.json();
    setText(data.textBio);
    setIsEditing(false);
    setUserBio(data);
  };
  useEffect(() => {
    getBio();
  }, []);
  return (
    <section className="user">
      <div className="row user__content">
        <div className="col-lg-2  col-md-12 col-sm-12   user__content__sections">
          <figure className="text-center mt-5 mb-2">
            <img
              className="user__content__sections__img rounded-circle"
              src={avatar}
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
                to="/profile"
              >
                <span>|</span> Shop history
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/profile/activity"
              >
                <span>|</span>Blog activity{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/profile/whislist"
              >
                <span>|</span>My Wishlist{" "}
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-lg-8 col-md-12 order-md-3 order-sm-3 order-2">
          <Outlet />
        </div>
        <div className="col-lg-2 col-md-12  order-md-2   order-lg-3   px-2 text-center user__content__biography ">
          <div className="user__content__biography__box">
            <div>
              {text ? (
                <>
                  <p className="user__content__biography__box__paragraph position-relative">
                    <FaEdit
                      onClick={editBio}
                      className="text-muted position-absolute top-0 end-0"
                    />
                    <h3 className="mt-5 mb-2">BIOGRAPHY</h3>
                    {text}
                  </p>
                </>
              ) : (
                <form className="my-5" onSubmit={handelBioSubmit}>
                  <h4 className="">
                    {isEditing ? "Edit Your Biography" : "Add Your Biography"}
                  </h4>

                  <textarea
                    name="bio"
                    id="bio"
                    cols="20"
                    rows="4"
                    ref={bio}
                    required
                    className="mx-auto"
                  ></textarea>
                  <button
                    type="submit"
                    className={`btn w-25 py-0  mx-auto d-block ${
                      isEditing ? "btn-danger" : "btn-primary"
                    }`}
                  >
                    {isEditing ? "Edit" : "Add"}
                  </button>
                </form>
              )}
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
