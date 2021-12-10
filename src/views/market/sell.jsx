import React, { useState, useEffect } from "react";
import FormikField from "../../shared/formik/FormikField";
import SelectFormikFiels from "../../shared/formik/SelectFormikFiels";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

// import { FaRegTimesCircle } from "react-icons/fa";
import { postNewDevice } from "../../redux/actions/marketActions";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Loading from "../../shared/Loading";
function Sell() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const dropDownOptions = [
    {
      key: "select a device",
      value: "",
    },
    { key: "laptop", value: "laptop" },
    { key: "mobile", value: "mobile" },
    { key: "pc", value: "pc" },
    { key: "accessories", value: "accessories" },
  ];
  const initialValues = {
    deviceName: "",
    deviceType: "",
    description: "",
    images: "",
    devicePrice: "",
    devicePlace: "",
    name: "",
    phone: "",
    email: "",
  };
  const onSubmit = (values) => {
    dispatch(postNewDevice(values, image, imageURL));
    navigate("/market/buy");
  };

  // window.location.replace("http://localhost:3000/market/buy");
  const validationSchema = yup.object({
    deviceName: yup.string().required("Device Name field is required"),
    deviceType: yup.string().required("Device type field is required"),
    description: yup.string().required("Description field is required"),
    // images: yup.mixed().required("images field is required"),
    devicePrice: yup.number().required("Device price field is required "),
    devicePlace: yup.string().required("Device place field is required "),
    // name: yup.string().required("name field is required "),
    phone: yup.string().required("phone field is required "),
    // email: yup
    //   .string()
    //   .email("Please enter a valid email address")
    //   .required("Email field is required"),
  });
  const handleImage = async (e) => {
    setIsLoading(true);
    let arrayOfImages = [];
    let url = "https://api.Cloudinary.com/v1_1/djup5x8bq/image/upload";
    for (let i = 0; i < e.target.files.length; i++) {
      let imageData = new FormData();
      imageData.append("file", e.target.files[i]);
      imageData.append("upload_preset", "rt0s8dsk");
      const options = { method: "post", body: imageData };
      const resp = await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          arrayOfImages.push(data.url);
        })
        .catch((err) => alert("please Check your connection " + err))
        .finally(() => setIsLoading(false));
    }
    setImageURL(arrayOfImages);
    // let imageUrl = URL.createObjectURL(e.target.files[0]);
    // console.log(imageUrl);
    // setImageURL(imageUrl);
  };

  return (
    <div className="container sell-form gap">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Market</title>
      </Helmet>
      <h2 className="header__sell-form">
        Enter the required information about your device
      </h2>
      <div className="vistMarket">
        <Link to="/market/buy">
          <Button variant="primary" className="addProduct__btn">
            Vist The Market
          </Button>
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(forimk) => {
          return (
            <Form>
              <div className="sell-fields" style={{ padding: 20 }}>
                <FormikField
                  label="Device Name"
                  name="deviceName"
                  type="text"
                />

                <SelectFormikFiels
                  label="Device Type"
                  name="deviceType"
                  options={dropDownOptions}
                />

                <FormikField
                  label="Description"
                  name="description"
                  type="textarea"
                />
                <figcaption className="Device-img">Device Image</figcaption>
                <input
                  label="Add Images"
                  name="images"
                  className="my-2"
                  type="file"
                  multiple
                  onChange={handleImage}
                />

                {isLoading ? (
                  <div>
                    <p>Select Main thumbnail:</p>
                    {imageURL.length === 0 ? <Loading /> : <></>}
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    {imageURL.map((img) => (
                      <figure
                        onClick={() => setImage(img)}
                        className={`ms-2 mt-2 w-25 selection ${
                          image === img ? "activeimg" : ""
                        }`}
                      >
                        <img className="w-100" src={img} alt="proudct-img" />
                      </figure>
                    ))}
                  </div>
                )}
                <FormikField
                  label="Device Price"
                  name="devicePrice"
                  type="number"
                />
                <FormikField
                  label="Device Place"
                  name="devicePlace"
                  type="text"
                />
                <hr />

                {/* <FormikField label="Name" name="name" type="text" />
                <FormikField label="Email" name="email" type="email" /> */}

                <FormikField
                  label="Phone"
                  textMuted="(Notice: Users will contact you through this number)"
                  name="phone"
                  type="text"
                />

                <button
                  disabled={imageURL.length === 0}
                  className="submit__sell-form"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Sell;
