import React from "react";

export default function Post() {
  return (
    <div className="d-flex">
      <div className="side d-flex justify-content-center align-items-center">
        <h2 className="text-white">Marketonics</h2>
      </div>
      <div className="d-flex flex-column align-items-start ms-5 w-100 mt-5">
        <div className="w-75 d-flex flex-column">
          <label>Topic Title</label>
          <input className="w-50" placeholder="Topic Title" />
        </div>
        <div className="w-75 d-flex flex-column mt-5 ">
          <label>Topic Description</label>
          <textarea
            className="w-50 text_height"
            placeholder="Topic Description"
          />
        </div>
        <button className="post_btn mt-3">Post</button>
      </div>
    </div>
  );
}
