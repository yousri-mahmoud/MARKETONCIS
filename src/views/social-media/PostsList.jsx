import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash, FaThumbsUp } from "react-icons/fa";

export default function PostsList(props) {
  const { title, desc, id, name, userId, postDate } = props.post;
  const toparent = props.toparent;
  const [count, setCount] = useState(0);
  const [isItMe, setIsItMe] = useState(false);
  const [postTime, setPostTime] = useState("");
  const [show, setShow] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState([]);

  const [likedUsers, setLikedUsers] = useState([]);

  let user = JSON.parse(localStorage.getItem("user")).id;
  let userName =
    JSON.parse(localStorage.getItem("user")).firstName +
    " " +
    JSON.parse(localStorage.getItem("user")).lastName;
  const handleClose = () => setShow(false);
  const handleCloseLikes = () => setShowLikes(false);
  const handleShow = () => setShow(true);
  const handleShowLikes = () => setShowLikes(true);
  useEffect(() => {
    if (user === userId) setIsItMe(true);
    else setIsItMe(false);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let pstDate = postDate.split(" ");
    if (year > pstDate[0])
      setPostTime(
        year - pstDate[0] == 1
          ? month < pstDate[1]
            ? month + 12 - pstDate[1] + " months ago"
            : "1 year ago"
          : year - pstDate[0] + " years ago"
      );
    else if (month > pstDate[1])
      setPostTime(
        month - pstDate[1] == 1
          ? day < pstDate[2]
            ? day + 30 - pstDate[2] + " days ago"
            : "1 month ago"
          : month - pstDate[1] + " months ago"
      );
    else if (day > pstDate[2])
      setPostTime(
        day - pstDate[2] == 1
          ? hour < pstDate[3]
            ? hour + 24 - pstDate[3] + " hours ago"
            : "1 day ago"
          : day - pstDate[2] + " days ago"
      );
    else if (hour > pstDate[3])
      setPostTime(
        hour - pstDate[3] == 1
          ? minutes < pstDate[4]
            ? minutes + 60 - pstDate[4] + " minutes ago"
            : "1 hour ago"
          : hour - pstDate[3] + " hours ago"
      );
    else if (minutes > pstDate[4])
      setPostTime(
        minutes - pstDate[4] == 1
          ? "1 minute ago"
          : minutes - pstDate[4] + " minutes ago"
      );
    else setPostTime("Now");
    fetchCount();
  }, [props.post]);
  const fetchCount = async () => {
    const response = await fetch(`http://localhost:3001/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setCount(data.countComment));
  };
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
    });
    // console.log(deletedId);
    handleClose();
    toparent();
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/posts/${id}/likes`, {
      method: "POST",
      body: JSON.stringify({ likeUserId: user, name: userName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchLikes();
  };
  const fetchLikes = async () => {
    const resp = await fetch(`http://localhost:3001/posts/${id}/likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  useEffect(() => {
    fetchLikes();
  }, []);
  useEffect(() => {
    let usersLikes = likes.map((like) => like.likeUserId);
    setLikedUsers(usersLikes);
  }, [likes]);

  const handleUnLike = async (e) => {
    e.preventDefault();
    let likedIdDelete = likes.filter((like) => like.likeUserId === user);
    console.log(likedIdDelete[0].id);
    const response = await fetch(
      `http://localhost:3001/likes/${likedIdDelete[0].id}`,
      {
        method: "DELETE",
      }
    );
    fetchLikes();
  };
  const handleShowLike = (e) => {
    e.preventDefault();
    setShowLikes(true);
  };
  return (
    <div className="shadow px-4 py-2 w-100 mb-4">
      {isItMe ? (
        <div className="d-flex justify-content-end">
         
            <FaTrash  className="text-danger icon"  data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleShow} />
        </div>
      ) : (
        <></>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want delete this Post?</Modal.Title>
        </Modal.Header>
        <Modal.Body>It will be deleted permanently</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLikes} onHide={handleCloseLikes}>
        <Modal.Header closeButton>
          <Modal.Title>Likes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {likes.map((like) => (
            <div>
              <Link
                to={
                  user === like.likeUserId
                    ? "/profile"
                    : `/globalProfile/${like.likeUserId}`
                }
              >
                {like.name}
              </Link>
              <hr />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLikes}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Link to={`/social-media/post/${id}`}>
        <div>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <label className="clickable" onClick={handleShowLike}>
            {likes.length} Likes
          </label>
          {likedUsers.includes(user) ? (
            <button
              onClick={handleUnLike}
              className="bg-transparent  border-0 ms-3"
            >
                <FaThumbsUp className="text-primary icon" />
            </button>
          ) : (
            <button
              onClick={handleLike}
              className="bg-transparent border-0 ms-3"
            >
              <FaThumbsUp className="text-muted icon" />
            </button>
          )}
        </div>
        <hr />
        <div className="d-flex justify-content-around">
          <p>
            Posted By{" "}
            <Link
              to={user === userId ? "/profile" : `/globalProfile/${userId}`}
              className="text-primary"
            >
              {name}
            </Link>
          </p>
          <p>{postTime} </p>
          <p>{count ? count : "0"} Comment</p>
        </div>
      </Link>
    </div>
  );
}
