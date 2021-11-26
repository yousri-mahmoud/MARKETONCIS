import React from "react";
import FormikField from "../../shared/formik/FormikField";
import SelectFormikFiels from "../../shared/formik/SelectFormikFiels";
import { FaRegTimesCircle } from "react-icons/fa";

import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
function Sell() {
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
    images: [],
    devicePrice: "",
    devicePlace: "",
    name: "",
    phone: "",
    email: "",
  };

  const onSubmit = (values) =>
    window.location.replace("http://localhost:3000/market/buy");
  const validationSchema = yup.object({
    deviceName: yup.string().required("Device Name field is required"),
    deviceType: yup.string().required("Device type field is required"),
    description: yup.string().required("Description field is required"),
    images: yup.mixed().required("images field is required"),
    devicePrice: yup.number().required("Device price field is required "),
    devicePlace: yup.string().required("Device place field is required "),
    name: yup.string().required("name field is required "),
    phone: yup.number().required("phone field is required "),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
  });
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
                <FieldArray name="images">
                  {({ remove, push }) => (
                    <div className="my-3">
                      {forimk.values.images.length > 0 &&
                        forimk.values.images.map((image, index) => (
                          <div className="row align-items-end" key={index}>
                            <div className="col">
                              <label htmlFor={`images.${index}`}>
                                image-{index + 1}
                              </label>
                              <br />
                              <FormikField
                                label=""
                                name={`images.${index}`}
                                type="file"
                                className="my-2"
                              />
                            </div>
                            <div className="col">
                              <FaRegTimesCircle
                                onClick={() => remove(index)}
                                className="close-icon"
                              />
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="add-image__sell-form"
                        onClick={() => push("")}
                      >
                        Add Image
                      </button>
                    </div>
                  )}
                </FieldArray>
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

                <FormikField label="Name" name="name" type="text" />
                <FormikField label="Phone" name="phone" type="number" />
                <FormikField label="Email" name="email" type="email" />

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
