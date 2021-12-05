import { Link } from "react-router-dom";
const BlogCard = ({ question, description, postedBy, id }) => {
  return (
    <div>
      <Link to={`/social-media/post/${id}`}>
        <div className="activity__content mt-4">
          <div className="activity__content__box shadow  mb-4">
            <h3 className="text-black">{question}</h3>
            <div className="activity__content__box__info ">
              <div className="activity__content__box__info__description ">
                <p className="">{description}</p>
              </div>
            </div>
            <hr className="text-black" />
            <div className="activity__content__box__footer d-flex justify-content-around">
              <h5>
                Posted by <span>{postedBy}</span>
              </h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
