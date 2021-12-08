import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CommentInfo } from "./../../redux/actions/commentAction";
import Loading from "../../shared/Loading";
import { Button } from "react-bootstrap";

export default function PostDetails() {
  const id = useParams().id;
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);

  const [item, setItem] = useState({});
  const [name, setName] = useState("");
  const commentStore = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentAuthorId, setCommentAuthorId] = useState("");
  const { title, desc, userId } = item;
  let postAuthor = item.name;
  let nme = localStorage.getItem("user");
  useEffect(() => {
    setCommentAuthorId(JSON.parse(nme).id);
    setName(JSON.parse(nme).firstName);
  }, []);
  useEffect(() => {
    console.log("opaa");
    fetchComment();
  }, [commentStore]);
  useEffect(() => {
    setIsPostLoading(true);
    fetchItem();
  }, []);
  useEffect(() => {
    fetchCount();
  }, [comments]);
  const fetchComment = async () => {
    const commentsResponse = await fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let updatedComments = data?.filter((comm) => {
          return comm.postId === id;
        });
        setComments(updatedComments);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsCommentLoading(false));
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
      .then((data) => setItem(data))
      .catch((err) => console.log(err))
      .finally(() => setIsPostLoading(false));
  };
  const handleComment = () => {
    setIsCommentLoading(true);
    dispatch(
      CommentInfo({
        postId: id,
        author: name,
        comment: comment,
        commentAuthorId,
      })
    ).then(() => fetchComment());

    setComment("");
  };
  return (
    <div className="container  postDetails gap">
      {isPostLoading ? (
        <Loading />
      ) : (
        <div className="shadow ms-3 mt-3 p-3">
          <p>
            By{" "}
            <Link
              to={
                JSON.parse(nme).id === userId
                  ? "/profile"
                  : `/globalProfile/${userId}`
              }
            >
              {postAuthor}{" "}
            </Link>
          </p>
          <h2 className="row m-0 ms-4 postDetails__title titleColor ">{title}</h2>
          <p className="row m-0 ms-4 fs-3 mt-4">{desc}</p>
        </div>
      )}
      <p className="fw-bold ms-3 mt-4">Comments</p>
      {isCommentLoading ? (
        <Loading />
      ) : (
        <div>
          {comments.map((comment) => (
            <div className="shadow w-50 ms-3 p-3">
              <p className="m-0 p-0 fw-bold fit-content">
                <Link
                  to={
                    JSON.parse(nme).id === comment.commentAuthorId
                      ? "/profile"
                      : `/globalProfile/${comment.commentAuthorId}`
                  }
                >
                  {comment.author}
                </Link>
              </p>

              <p className="m-0 p-0">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-column w-50 align-items-end ms-3 mb-3">
        <textarea
          className="w-100 mt-3"
          placeholder="Add Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          disabled={!comment ? true : false}
          className="w-25 mt-1 btn-primary"
          onClick={handleComment}
        >
          Comment
        </Button>
      </div>
    </div>
  );
}
