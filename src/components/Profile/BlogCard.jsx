import React, { useState } from "react";
import { FaRegCommentAlt} from "react-icons/fa";

const BlogCard = ({question, description , postedBy, time}) => {
    const [comments, setComments] = useState(["this is good", "this is not good", "you are a good boy"])
    const [show, setShow] = useState(true);
    return (
        <div>
                <div className="activity__content mt-4">
        <div className="activity__content__box mb-4">
         <h3>{question}</h3>
          <div className="activity__content__box__info ">
            
            <div className="activity__content__box__info__description ">
              <p className="">
                {description}
              </p>
            </div>
          </div>
          <hr />
          <div className="activity__content__box__footer d-flex justify-content-around">
            <h5>Posted by <span>{postedBy}</span></h5>
            <p>{time} ago</p>
            <div>
            <FaRegCommentAlt onClick={() => setShow(!show)} color="gray" /><span>20+</span>
            </div>
          </div>
          <div className={`activity__comments   ${show ? "d-none" : ""}`}>
            <div className="activity__comments__box">
                    {comments.map((comment, index) => {
                      return (
                        <h3 key={index}> {comment} </h3>
                      )
                    })}
            </div>

          </div>
        </div>

        

        
      </div>
        </div>
    )
}

export default BlogCard
