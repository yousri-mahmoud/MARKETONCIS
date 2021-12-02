import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function PostsList(props) {
  const { title, desc, id, name, userId, postDate } = props.post;
  const [count, setCount] = useState(0);
  const [postTime, setPostTime] = useState("");
  useEffect(() => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let pstDate = postDate.split(" ");
    if (year > pstDate[0])
      setPostTime(
        year - pstDate[0] == 1 ? "1 year ago" : year - pstDate[0] + " years ago"
      );
    else if (month > pstDate[1])
      setPostTime(
        month - pstDate[1] == 1
          ? "1 month ago"
          : month - pstDate[1] + " months ago"
      );
    else if (day > pstDate[2])
      setPostTime(
        day - pstDate[2] == 1 ? "1 day ago" : day - pstDate[2] + " days ago"
      );
    else if (hour > pstDate[3])
      setPostTime(
        hour - pstDate[3] == 1 ? "1 hour ago" : hour - pstDate[3] + " hours ago"
      );
    else if (minutes > pstDate[4])
      setPostTime(
        minutes - pstDate[4] == 1
          ? "1 minute ago"
          : minutes - pstDate[4] + " minutes ago"
      );
    else setPostTime("Now");
    fetchCount();
  }, []);
  const fetchCount = async () => {
    const response = await fetch(`http://localhost:3001/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setCount(data.countComment));
  };
  console.log(count);
  return (
    <Link to={`/social-media/post/${id}`}>
      <div className="shadow p-4 w-100 mb-2">
        <div>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
        <hr />
        <div className="d-flex justify-content-around">
          <p>
            Posted By{" "}
            <Link to={`/globalProfile/${userId}`} className="text-primary">
              {name}
            </Link>
          </p>
          <p>{postTime} </p>
          <p>{count ? count : "0"} Comment</p>
        </div>
      </div>
    </Link>
  );
}
