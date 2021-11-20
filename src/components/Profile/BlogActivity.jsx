import React from "react";
import { FaSortUp, FaSortDown, FaRegCommentAlt} from "react-icons/fa";

const BlogActivity = () => {
  return (
    <section className="activity mt-4 w-75 m-auto">
      <header>
        <h2>Blog Activity</h2>
      </header>
      <div className="activity__content mt-4">
        <div className="activity__content__box mb-4">
         <h3 className="ms-5">what is the best laptop for programming ?</h3>
          <div className="activity__content__box__info d-flex ">
            <div className="activity__content__box__info__votes">
              <FaSortUp className="up" />
              <h4>30</h4>
              <FaSortDown className="gray" />
            </div>
            <div className="activity__content__box__info__description ms-2">
              <p className="">
                in last few days i search about the best laptops for programming
                are you guys have any suggestion
              </p>
            </div>
          </div>
          <hr />
          <div className="activity__content__box__footer d-flex justify-content-around">
            <h5>Posted by <span>Ryo Lu</span></h5>
            <p>2hr ago</p>
            <div>
            <FaRegCommentAlt color="gray" /><span>20+</span>
            </div>
          </div>
        </div>

        <div className="activity__content__box mb-4">
         <h3 className="ms-5">what is the best laptop for programming ?</h3>
          <div className="activity__content__box__info d-flex ">
            <div className="activity__content__box__info__votes">
              <FaSortUp className="gray" />
              <h4 className="down">-4 </h4>
              <FaSortDown className="down" />
            </div>
            <div className="activity__content__box__info__description ms-2">
              <p className="">
                in last few days i search about the best laptops for programming
                are you guys have any suggestion
              </p>
            </div>
          </div>
          <hr />
          <div className="activity__content__box__footer d-flex justify-content-around">
            <h5>Posted by <span>Ryo Lu</span></h5>
            <p>2hr ago</p>
            <div>
            <FaRegCommentAlt color="gray" /><span>20+</span>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default BlogActivity;
