import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Loading from "../../shared/Loading";
const BlogActivity = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const res = await fetch(`http://localhost:3001/posts?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section className="activity mt-4 w-75 m-auto">
      <header>
        <h2>Blog Activity</h2>
      </header>
      {isLoading ? (
        <Loading />
      ) : posts.length == 0 ? (
        <h2 className="text-dark text-center py-3">no posts added yet</h2>
      ) : (
        posts.map((item) => {
          return (
            <BlogCard
              key={item.id}
              question={item.title}
              description={item.desc}
              postedBy={`${user.firstName} ${user.lastName}`}
              id={item.id}
            />
          );
        })
      )}
    </section>
  );
};

export default BlogActivity;
