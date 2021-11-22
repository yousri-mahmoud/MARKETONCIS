import React from "react";
import BlogCard from "./BlogCard";

const BlogActivity = () => {


  return (
    <section className="activity mt-4 w-75 m-auto">
      <header>
        <h2>Blog Activity</h2>
      </header>
      <BlogCard
       question="what is the best laptop for programming ?"
       description="in last few days i search about the best laptops for programming are you guys have any suggestion" 
       postedBy="maged ahmed"
       time="3hr"
      
      />

     <BlogCard
       question="what is the best laptop for programming ?"
       description="in last few days i search about the best laptops for programming are you guys have any suggestion" 
       postedBy="maged ahmed"
       time="3hr"
      
      />
  
    </section>
  );
};

export default BlogActivity;
