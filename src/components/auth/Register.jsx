import FormikField from "../../shared/formik/FormikField";
import SelectFormikFiels from "../../shared/formik/SelectFormikFiels";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { userRegister } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const RegisterComponent = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  if (state.isLogIn) navigate("/profile");
  const dispatch = useDispatch();
  const dropDownOptions = [
    {
      key: "select gender",
      value: "",
    },
    { key: "male", value: "male" },
    { key: "female", value: "female" },
  ];
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    dispatch(userRegister({ ...values, confirmPassword: "protected" }));
  };
  const validationSchema = yup.object({
    firstName: yup.string().required("first name is required "),
    lastName: yup.string().required("last name is required "),
    gender: yup.string().required("select gender is required "),
    address: yup.string().required("Address name is required "),
    password: yup.string().required("password field is required "),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "password must match"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
  });
  return (
    <div className="form">
      <div className="form__content d-flex justify-content-between align-items-center">
        <div className="form__content__rouet  col-lg-3">
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
            <h2>MARKETONICS</h2>
          </div>
        </div>
        <div className=" form__content__fields col-lg-5">
          <h2>Sign up</h2>
          <Formik
            className=""
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(forimk) => {
              return (
                <Form>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                  <FormikField
                    label="First Name"
                    name="firstName"
                    type="text"
                  />
                  </div>
                  <div>

                  <FormikField label="Last Name" name="lastName" type="text" />
                  </div>
                  </div>
                  <SelectFormikFiels
                    label="Gender"
                    name="gender"
                    options={dropDownOptions}
                  />
                  <div className="d-flex align-items-center">

                  <div className="me-3">
                  <FormikField label="Email" name="email" type="email" />

                  </div>
                  <div>
                  <FormikField label="Address" name="address" type="text" />
                  </div>
                  </div>
                  <FormikField
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <FormikField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />

                  <button className="submit__form" type="submit">
                    Sign up
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

export default RegisterComponent;
