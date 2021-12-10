import React, { useEffect, useState, useRef } from "react";
import img from "../../assets/image/user.jpg";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import man from "../../assets/image/man.jpg";
import woman from "../../assets/image/woman.jpg";
import Loading from "../../shared/Loading";
const ProfileBase = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let avatar = "";
  if (user.gender === "male") avatar = man;
  if (user.gender === "female") avatar = woman;
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [userBio, setUserBio] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const bio = useRef(null);
  let id = JSON.parse(localStorage.getItem("user")).id;

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

    setUserBio(data);
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
  const handleProfilePicture = async (e) => {
    setIsImageLoading(true);
    let imageData = new FormData();
    let url = "https://api.Cloudinary.com/v1_1/djup5x8bq/image/upload";
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", "rt0s8dsk");
    const options = { method: "post", body: imageData };
    const resp = await fetch(url, options)
      .then((res) => res.json())
      .then((data) => setImageURL(data.url))
      .catch((err) => alert("Please check your internet connection"));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    patchImage();
  }, [imageURL]);
  const patchImage = async () => {
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ profileImg: imageURL }),
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => setIsImageLoading(false));
  };

  const fetchUser = async () => {
    const resp = await fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => setImageURL(data.profileImg))
      .catch((err) => console.log(err))
      .finally(() => setIsImageLoading(false));
  };
  return (
    <section className="user gap">
      <div className="row user__content">
        <div className="col-lg-2  col-md-12 col-sm-12   user__content__sections">
          {isImageLoading ? (
            <Loading />
          ) : (
            <figure className="text-center mt-5 mb-2">
              <img
                className="user__content__sections__img rounded-circle"
                src={imageURL ? imageURL : avatar}
                alt="user"
              />
              <label for="upload">
                {" "}
                <FaEdit className="text-muted  add-img" />
              </label>
              <input
                onChange={handleProfilePicture}
                className="d-none"
                id="upload"
                type="file"
              />
              <figcaption>
                <h3 className="text-center">{`${user.firstName} ${user.lastName} `}</h3>
              </figcaption>
            </figure>
          )}
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
                  <div className="user__content__biography__box__paragraph position-relative">
                    <FaEdit onClick={editBio} className="text-muted fa-edit" />
                    <h3 className="mt-5 mb-2">BIOGRAPHY</h3>
                    <p className="user__content__biography__box__paragraph__text">
                      {text}
                    </p>
                  </div>
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
                    className={`btn  py-0  mx-auto d-block ${
                      isEditing ? "btn-danger" : "add"
                    }`}
                  >
                    {isEditing ? "Edit" : "Add"}
                  </button>
                </form>
              )}
            </div>
            <div className="user__content__biography__box__location">
              <h3>LOCATION</h3>
              <p className="user__content__biography__box__location__text">
                {user.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBase;
