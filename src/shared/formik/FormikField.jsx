import React from "react";
import { Field } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";

/**
 * FormikField Component
 */
const FormikField = ({ name, type, label }) => {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <label htmlFor={name} style={{ display: "block" }}>
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                rows="4"
                className="w-100 my-2 "
                name={name}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              ></textarea>
            ) : (
              <input
                className="w-100 my-2"
                type={type}
                id={name}
                {...formikField.field}
                defaultChecked={formikField.field.value}
              />
            )}

            <FormikErrorMessage name={name} />
          </>
        );
      }}
    </Field>
  );
};

export default FormikField;
