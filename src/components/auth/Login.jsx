import FormikField from "../../shared/formik/FormikField";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { userLogin } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  if (state.isLogIn) navigate("/profile");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    setDef(false);
    dispatch(userLogin(values));
  };

  const validationSchema = yup.object({
    password: yup.string().required("password field is required "),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
  });
  const [def, setDef] = useState();
  useEffect(() => {
    setDef(true);
  }, []);
  return (
    <div className="form ">
      <div className="form__content d-flex justify-content-between align-items-center">
        <div className="form__content__rouet  col-lg-3 login">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/login"
              >
                {" "}
                SignIn{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/register"
              >
                SignUp
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="form__content__logo col-lg-3 text-center">
          <div className="form__content__logo__content">
            <h2>MARKETONCIS</h2>
          </div>
        </div>
        <div className=" form__content__fields col-lg-5">
          <h2>Sign In</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(forimk) => {
              return (
                <Form>
                  <FormikField label="Email" name="email" type="email" />
                  <FormikField
                    label="password"
                    name="password"
                    type="password"
                  />
                  {def && !state.isLogIn ? (
                    <></>
                  ) : (
                    <small className="text-danger error">{state.message}</small>
                  )}

                  <button className="submit__form" type="submit">
                    Sign In
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
