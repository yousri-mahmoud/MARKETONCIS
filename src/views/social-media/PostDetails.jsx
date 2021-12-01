import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommentInfo } from "./../../redux/actions/commentAction";

export default function PostDetails() {
  const id = useParams().id;
  const [item, setItem] = useState({});
  const [name, setName] = useState("");
  const commentStore = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentAuthorId, setCommentAuthorId] = useState("");
  const { title, desc, userId } = item;
  let postAuthor = item.name;
  useEffect(() => {
    let nme = localStorage.getItem("user");
    setCommentAuthorId(JSON.parse(nme).id);
    setName(JSON.parse(nme).firstName);
  }, []);
  useEffect(() => {
    fetchComment();
  }, [commentStore]);
  useEffect(() => {
    fetchItem();
  }, []);
  useEffect(() => {
    fetchCount();
  }, [comments]);
  const fetchComment = async () => {
    const commentsResponse = await fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => {
        let updatedComments = data?.filter((comm) => {
          return comm.postId === id;
        });
        setComments(updatedComments);
      });
  };
  const fetchCount = async () => {
    const responsecount = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ countComment: comments.length }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // console.log(comments);
  const fetchItem = async () => {
    const response = await fetch(`http://localhost:3001/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  };
  const handleComment = () => {
    dispatch(
      CommentInfo({
        postId: id,
        author: name,
        comment: comment,
        commentAuthorId,
      })
    );
  };
  console.log(comments);
  return (
    <div>
      <div className="shadow w-50 ms-3 mt-3 p-3">
        <p>
          By <Link to={`/globalProfile/${userId}`}>{postAuthor} </Link>
        </p>
        <h1 className="row m-0 ms-4 titleColor ">{title}</h1>
        <p className="row m-0 ms-4 fs-3 mt-4">{desc}</p>
      </div>
      <p className="fw-bold ms-3 mt-1">Comments</p>
      <div>
        {comments.map((comment) => (
          <div className="shadow w-25 ms-3 p-3">
            <p className="m-0 p-0 fw-bold fit-content">
              <Link to={`/globalProfile/${comment.commentAuthorId}`}>
                {comment.author}
              </Link>
            </p>

            <p className="m-0 p-0">{comment.comment}</p>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column w-25 align-items-end ms-3 mb-3">
        <textarea
          className="w-100 mt-3"
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="w-25 mt-1 btn-primary" onClick={handleComment}>
          Comment
        </button>
      </div>
    </div>
  );
}
