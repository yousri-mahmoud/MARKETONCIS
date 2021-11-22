import FormikField from "../../shared/formik/FormikField"
import { Formik, Form, } from "formik";
import { NavLink} from "react-router-dom";
import * as yup from "yup";


const LoginComponent = () => {
    const initialValues = {
        email: "",
        password:""
      };
    
      const onSubmit = (values) =>
      console.log(values);
      const validationSchema = yup.object({

        password: yup.string().required("password field is required "),
        email: yup
          .string()
          .email("Please enter a valid email address")
          .required("Email field is required"),
      });
    return (
      <div className="form ">
      <div className="form__content d-flex justify-content-between align-items-center">
        <div className="form__content__rouet  col-lg-1">
        <ul>
        <li><NavLink   className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/login"> SignIn </NavLink></li>
          <li><NavLink  end   className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/register">SignUp</NavLink></li>
        </ul>
        </div>

        <div className="form__content__logo col-lg-3 ">
            <h2>MARKETONCIS</h2>
        </div>
        <div className=" form__content__fields login">
        <h2>Sign In</h2>

        <Formik
        className="col-lg-8"
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(forimk) => {
          return (
            <Form>
              <FormikField label="Email" name="email" type="email" />
              <FormikField label="password" name="password" type="password" />
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
    )
}

export default LoginComponent
