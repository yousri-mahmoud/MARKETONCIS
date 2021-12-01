import React, { useState, useEffect } from "react";
import FormikField from "../../shared/formik/FormikField";
import SelectFormikFiels from "../../shared/formik/SelectFormikFiels";
// import { FaRegTimesCircle } from "react-icons/fa";
import { postNewDevice } from "../../redux/actions/marketActions";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CloudinaryContext, Image, Cloudinary } from "cloudinary-react";
function Sell() {
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
    dispatch(postNewDevice(values, imageURL));
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
    let imageData = new FormData();
    let url = "https://api.Cloudinary.com/v1_1/djup5x8bq/image/upload";
    imageData.append("file", e.target.files[0]);
    imageData.append("upload_preset", "rt0s8dsk");
    const options = { method: "post", body: imageData };
    const resp = await fetch(url, options)
      .then((res) => res.json())
      .then((data) => setImageURL(data.url));
    // let imageUrl = URL.createObjectURL(e.target.files[0]);
    // console.log(imageUrl);
    // setImageURL(imageUrl);
  };

  return (
    <div className="container sell-form">
      <h2 className="header__sell-form">
        Enter the required information about your device
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(forimk) => {
          return (
            <Form>
              <div className="w-50 m-auto" style={{ padding: 20 }}>
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
                <input
                  label="Add Images"
                  name="images"
                  type="file"
                  onChange={handleImage}
                />
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
                <FormikField label="Phone" name="phone" type="text" />

                <button className="submit__sell-form" type="submit">
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
