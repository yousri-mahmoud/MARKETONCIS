import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Loading from "../../shared/Loading";
import { useSelector, useDispatch } from "react-redux";
import { PostInfo } from "../../redux/actions/PostAction";
import PostsList from "./PostsList";
function SocialMedia({ resource, newFetch }) {
  // console.log(resource.post.read());
  const [current, setCurrent] = useState(1);
  const [youWasHere, setYouWasHere] = useState(false);
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
  const [finished, setFinished] = useState(false);
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
    ).then(() => fetchPosts("add"));

    setTitle("");
    setDesc("");
    setShow(false);
  };
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchPosts();
  // }, [post]);

  const fetchPosts = (status = "scroll", deletedId = null) => {
    console.log(status);
    let page = current;

    if (status === "delete") {
      let newPosts = posts.filter((item) => item.id !== deletedId);
      setPosts(newPosts);
    } else if (status === "scroll") {
      if (deletedId) page = deletedId;
      fetch(
        `http://localhost:3001/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length < 5 && data.length !== 0) {
            {
              setFinished(true);
            }
          } else if (data.length === 5) {
            setFinished(false);
            setCurrent(current + 1);
          }
          if (page === 1) setPosts(data);
          else setPosts([...posts, ...data]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (status === "add") {
      fetch(`http://localhost:3001/posts?_page=1&_limit=5&_sort=id&_order=desc`)
        .then((res) => res.json())
        .then((data) => {
          let newData = [];
          newData = posts;
          if (finished) newData.pop();
          setPosts([data[0], ...newData]);
        });
    }

    fetch("http://localhost:3001/comments")
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
    else {
      fetchPosts("scroll", 1);
    }
  }, [searchText]);
  const handleSearch = async () => {
    if (searchText.length > 0) {
      fetch(`http://localhost:3001/posts?q=${searchText}`)
        .then((res) => res.json())
        .then((newPosts) => setPosts(newPosts));
    }
  };
  useEffect(() => {
    setYouWasHere(false);
  }, [current]);
  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
      e.target.clientHeight + 400
    ) {
      console.log(youWasHere);
      if (!youWasHere && !finished) {
        setYouWasHere(true);
        fetchPosts("scroll");
      }
    }
  };

  return (
    <section className="row blog gap">
      <div className="col-lg-2">
        <div className="side">
          <h2 className="">M A R K E T O N I C S</h2>
        </div>
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
          <button type="button" onClick={handleSearch} className="blog_button">
            Search
          </button>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            onScroll={handleScroll}
            className=" mt-5 posts-height overflow-scroll w-100"
          >
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
                  <h2 className="text-center">No Posts yet</h2>
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
