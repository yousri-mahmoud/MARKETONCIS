import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { useParams } from "react-router-dom";
const GlobalBlogActivity = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await fetch(`http://localhost:3001/posts?userId=${id}`);
    const data = await res.json();
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="activity mt-4 w-75 m-auto">
      <header>
        <h2>Blog Activity</h2>
      </header>
      {posts.length == 0 ? (
        <h3 className="text-dark text-center py-3">no posts added yet</h3>
      ) : (
        posts.map((item) => {
          return (
            <BlogCard
              key={item.id}
              question={item.title}
              description={item.desc}
              postedBy={item.name}
              id={item.id}
            />
          );
        })
      )}
    </section>
  );
};

export default GlobalBlogActivity;
