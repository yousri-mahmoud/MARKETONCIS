import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "../../shared/Loading";
import { useSelector, useDispatch } from "react-redux";
import { PostInfo } from "../../redux/actions/PostAction";
import PostsList from "./PostsList";
function SocialMedia() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(true);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let countComments = [];
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let nme = localStorage.getItem("user");
    setName(JSON.parse(nme).firstName);
    setUserId(JSON.parse(nme).id);
  }, []);
  const handlePost = (e) => {
    let date = new Date();
    dispatch(
      PostInfo({
        title,
        desc,
        name,
        userId,
        postDate:
          date.getFullYear() +
          " " +
          date.getMonth() +
          " " +
          date.getDate() +
          " " +
          date.getHours() +
          " " +
          date.getMinutes(),
      })
    );
    setTitle("");
    setDesc("");
    setShow(false);
  };
  useEffect(() => {
    setIsLoading(true);
    fetchPosts();
  }, [post]);
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    const commentResponse = await fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => {
        data.map((comment) =>
          countComments[comment.postId]
            ? (countComments[comment.postId] = 1)
            : countComments[comment.postId]++
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (searchText.length > 0) handleSearch();
    else fetchPosts();
  }, [searchText]);
  const handleSearch = async () => {
    // e.preventDefault();
    // alert(searchText);
    if (searchText.length > 0) {
      const resp = await fetch(`http://localhost:3001/posts?q=${searchText}`)
        .then((res) => res.json())
        .then((newPosts) => setPosts(newPosts));
    }
  };
  return (
    <section className="row blog">
      <div className="side col-lg-2">
        <h2 className="">M A R K E T O N I C S</h2>
      </div>
      <div className="box mt-3 col-lg col-md-12  order-md-3 order-sm-3 order-2">
          <div className="input__box">
            <input
              className="search_width"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for topics"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="blog_button"
            >
              Search
            </button>
          </div>
          {isLoading ? (
          <Loading />
        ) : (
          <div className=" mt-5">
            <div className="d-flex justify-content-center">
              <div className="post__card">
                {posts.length > 0 ? (
                  posts.map((post, id) => (
                    <PostsList
                      key={id}
                      post={post}
                      count={countComments}
                      toparent={fetchPosts}
                    />
                  ))
                ) : (
                  <h2>No Posts yet</h2>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-lg-2 mt-3 col-md-12 text-end   order-md-2   order-lg-3">
          <Button variant="primary" onClick={handleShow}>
            Add new Topic
          </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Post Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="w-100 d-flex flex-column">
                  <label>Topic Title</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-100"
                    placeholder="Topic Title"
                  />
                </div>
                <div className="w-100 d-flex flex-column mt-3">
                  <label>Topic Description</label>
                  <textarea
                    className="w-100 text_height"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Topic Description"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  disabled={!title || !desc ? true : false}
                  onClick={handlePost}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
    </section>
  );
}

export default SocialMedia;
