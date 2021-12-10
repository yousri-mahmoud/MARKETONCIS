import React, { useState, useEffect } from "react";
import Loading from "../../shared/Loading";
import { Link, useParams } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { FaWhatsappSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AddWhish } from "./../../redux/actions/whishAction";
import { Modal, Button } from "react-bootstrap";
function SingleProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const initailValue = {
    deviceDetail: {
      deviceName: "",
      deviceType: "",
      description: "",
      images: "",
      devicePrice: "",
      devicePlace: "",
      name: "",
      phone: "",
      email: "",
    },
    userId: "",
    id: "",
  };
  const dispatch = useDispatch();
  const [device, setDevice] = useState(initailValue);
  const [wList, setWList] = useState([]);
  const [list, setList] = useState([]);
  const [itemsId, setItemsId] = useState([]);
  const whishes = useSelector((wish) => wish.whish);
  const [previewImg, setPreviewImg] = useState();
  const [show, setShow] = useState(false);
  let { id } = useParams();
  const getdata = async () => {
    const response = await fetch(`http://localhost:3001/selling-posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDevice(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };
  const getWishes = async () => {
    const response = await fetch(`http://localhost:3001/whishList`)
      .then((res) => res.json())
      .then((list) => {
        setList(list);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getdata();
  }, []);
  useEffect(() => {
    getWishes();
  }, [whishes]);
  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // console.log(list);
    let updatedList = list?.filter((whish) => {
      console.log(whish.userId, user.id);
      return whish.userId === user.id;
    });
    // console.log(updatedList);
    setWList(updatedList);
  }, [list]);
  useEffect(() => {
    // console.log(wList);
    let newItemsID = wList.map((item) => item.itemId);
    setItemsId(newItemsID);
  }, [wList]);

  const handleWhish = (item) => {
    dispatch(
      AddWhish({
        deviceInfo: item.deviceDetail,
        userId: user.id,
        postedById: item.userId,
        imageUrl: item.imageUrl,
        itemId: item.id,
      })
    ).then(() => getWishes());
  };
  const handleDeleteWhish = async (item) => {
    let deletedId = wList.filter((it) => it.itemId === item.id);
    const response = await fetch(
      `http://localhost:3001/whishList/${deletedId[0].id}`,
      {
        method: "DELETE",
      }
    ).then(() => getWishes());
  };
  return (
    <>
      <div className="container  product">
        {isLoading ? (
          <Loading />
        ) : (
          <section class="about_product position-relative">
            {itemsId.includes(parseInt(id)) ? (
              <AiFillStar
                onClick={() => handleDeleteWhish(device)}
                className="text-warning position-absolute star top-0 end-0 "
              />
            ) : (
              <AiOutlineStar
                onClick={() => handleWhish(device)}
                className="text-warning position-absolute star top-0 end-0 "
              />
            )}
            <div class="productImg">
              <figure className={device.sold && "sold"}>
                <img src={device.imageUrl} alt="" />
              </figure>
            </div>

            <div class="details">
              <h6>{device.deviceDetail.deviceType}</h6>
              <div className="d-flex justify-content-between align-items-start">
                <h2>{device.deviceDetail.deviceName}</h2>

                <div class="price">{device.deviceDetail.devicePrice} EGP</div>
              </div>
              <p>{device.deviceDetail.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">
                    posted by :
                    <Link
                      to={
                        user.id === device.userId
                          ? "/profile"
                          : `/globalProfile/${device.userId}`
                      }
                    >
                      {device.userName}
                    </Link>
                  </small>
                  <small className="text-muted">
                    place : {device.deviceDetail.devicePlace}
                  </small>{" "}
                  <small className="text-muted">
                    phone : {device.deviceDetail.phone}
                  </small>
                </div>
                <div>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://wa.me/+2${device.deviceDetail.phone}`}
                  >
                    <FaWhatsappSquare className="whatsApp_icon" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <div className="d-flex gallery align-items-center justify-content-center">
        {device.images?.map((image) => (
          <figure
            onClick={() => {
              setPreviewImg(image);
              setShow(true);
            }}
            className="w-25 ms-3 "
          >
            <img className="w-100" alt="img" src={image}  />
          </figure>
        ))}
        <Modal  size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <figure className="w-100 text-center">
              <img className="modal-img" src={previewImg} />
            </figure>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default SingleProduct;
