import React from "react";
import { Field } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";
function SelectFormikFiels({ label, name, options = [] }) {
  return (
    <Field name={name}>
      {(formikField) => {
        return (
          <>
            <label htmlFor={name} style={{ display: "block" }}>
              {label}
            </label>
            <select {...formikField.field} id={name} className="w-100 my-2">
              {options.map((option) => {
                return (
                  <option key={options.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </select>
            <FormikErrorMessage name={name} />
          </>
        );
      }}
    </Field>
  );
}

export default SelectFormikFiels;
