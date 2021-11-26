import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function PostsList(props) {
  const { title, desc, id } = props.post;
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchCount();
  });
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
            Posted By <span className="text-primary">Ahmed Mido</span>
          </p>
          <p>Two hours ago </p>
          <p>{count} Comment</p>
        </div>
      </div>
    </Link>
  );
}
