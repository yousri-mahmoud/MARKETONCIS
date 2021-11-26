import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommentInfo } from "./../../redux/actions/commentAction";

export default function PostDetails() {
  const id = useParams().id;
  const [item, setItem] = useState({});
  const commentStore = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { title, desc } = item;
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
        let updatedComments = data.filter((comm) => {
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
    dispatch(CommentInfo({ postId: id, author: "ahmed", comment: comment }));
  };
  console.log(comments);
  return (
    <div className="">
      <h1 className="row m-0 ms-4 titleColor">{title}</h1>
      <p className="row m-0 ms-4 fs-3">{desc}</p>
      <div>
        {comments.map((comment) => (
          <>
            <p>{comment.author}</p>
            <p>{comment.comment}</p>
          </>
        ))}
      </div>
      <div>
        <textarea
          placeholder="add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>
      </div>
    </div>
  );
}
