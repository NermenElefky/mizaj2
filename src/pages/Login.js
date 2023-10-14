import React, { useContext, useState } from "react";
import "./Login.css";
import Lottie from "react-lottie";
import animationData from "../lotties/coffee.json";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEyeOff as Hide, FiEye as Show } from "react-icons/fi";
import defaultPhoto from "../assests/profile-img3.avif";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt from "jwt-decode";
import { makeNotify } from "../GlobalFunctions.js/GlobalFuncs";
import { MizajStore } from "../components/Context";

function Login({ setUserEmail }) {
  let history = useNavigate();
  const { setIsThereNewNotify } = useContext(MizajStore);

  const [isLogin, setIsLogin] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    showPassword: false,
  };

  const handelSignUp = ({ name, email, password }, { setErrors }) => {
    // check if there are any accounts in local storage
    if (!localStorage.getItem("users")) {
      // now local storage is empty
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            name,
            email,
            password,
            photo: defaultPhoto,
            bio: "coffee lover",
            phones: [""],
            orders: [],
            favorites: [],
            history: [],
            notifications: { old: [], new: [] },
          },
        ])
      );

      makeNotify(
        `welcome ${name}.`,
        "Thanks for joining Mizaj.",
        `${new Date()}`,
        email,
        setIsThereNewNotify
      );

      // add user to session storage
      sessionStorage.setItem("UserEmail", email);

      // define the user email to get all info about
      setUserEmail(email);

      // return to the page
      history(-1);
    } else {
      // now we need to check if the user is signed up before
      let data = JSON.parse(localStorage.getItem("users"));

      if (data.some((item) => item.email === email)) {
        setErrors({ email: "This accocunt already exists" });
      } else if (data.some((item) => item.name === name)) {
        setErrors({ name: "The user name is already exists" });
      } else {
        data.push({
          name,
          email,
          password,
          photo: defaultPhoto,
          bio: "coffee lover",
          phones: [""],
          orders: [],
          favorites: [],
          history: [],
          notifications: { old: [], new: [] },
        });

        // now add it to local storage
        localStorage.setItem("users", JSON.stringify(data));

        // add user to session storage
        sessionStorage.setItem("UserEmail", email);

        // define the user email to get all info about
        setUserEmail(email);

        // return to the page
        history(-1);

        // make a notify
        makeNotify(
          `welcome ${name}.`,
          "Thanks for joining Mizaj.",
          `${new Date()}`,
          email,
          setIsThereNewNotify
        );
      }
    }
  };

  const handelLog = ({ name, email, password }, { setErrors }) => {
    // check if email exists or not
    let data = JSON.parse(localStorage.getItem("users"));

    if (data) {
      if (
        data.some((item) => item.email === email && item.password === password)
      ) {
        // add user to session storage
        sessionStorage.setItem("UserEmail", email);

        // define the user email to get all info about
        setUserEmail(email);

        // now let's redirect to the window where the user was
        history(-1);
      } else if (data.every((item) => item.email !== email)) {
        setErrors({ email: "Email doesn't exist" });
      } else {
        setErrors({ password: "Password is wrong" });
      }
    } else {
      setErrors({ email: "Email doesn't exist" });
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]/, "should start with letters or numbers")
      .min(3, "must contain at least 3 characters")
      .max(15, "can't be more than 15 letters")
      .matches(/^(\w|\s)+$/, "name shouldn't contain special characters"),

    email: Yup.string()
      .email("Invaild")
      .required("This field is required")
      .matches(/\.([a-z]{2,4})$/, "Email should conatin domain name"),

    password: Yup.string()
      .required("This field is required")
      .min(8, "must contain at least 8 characters")
      .max(16, "can't be more than 16 letters")
      .matches(/[A-Z]/, "should contain at least one letter uppercase")
      .matches(/[a-z]/, "should contain at least one letter lowercase")
      .matches(/\W/, "should contain at least one special character")
      .matches(/\d/, "should contain at least one digit"),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invaild")
      .required("This field is required")
      .matches(/\.([a-z]{2,4})$/, "Email should conatin domain name"),

    password: Yup.string().required("This field is required"),
  });

  return (
    <div className="wrapper">
      <div className="login-img">
        <Lottie
          options={{ animationData: animationData, loop: true, autoplay: true }}
          width={325}
          height={325}
        />
      </div>
      <div className="login-info">
        <h3>Welcome to MIZAJ</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={isLogin ? handelLog : handelSignUp}
          validationSchema={isLogin ? loginValidationSchema : validationSchema}
        >
          {({ values, setValues, resetForm, errors }) => {
            return (
              <Form>
                {!isLogin && (
                  <label htmlFor="name">
                    <span>Display name</span>
                    <Field type="text" name="name" id="name" />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="errorMsg"
                    />
                  </label>
                )}
                <label htmlFor="email">
                  <span>Email</span>
                  <Field type="email" name="email" id="email" />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="errorMsg"
                  />
                </label>
                <label htmlFor="password" className="password">
                  <span>Password</span>
                  <Field
                    type={values.showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="errorMsg"
                  />
                  <NavLink to="/resetPassword">
                    <span>forget password?</span>
                  </NavLink>

                  <button
                    type="button"
                    className="show_hide"
                    onClick={() =>
                      setValues({
                        ...values,
                        showPassword: !values.showPassword,
                      })
                    }
                  >
                    {values.showPassword ? <Hide /> : <Show />}
                  </button>
                </label>
                <div className="btn-parent">
                  {isLogin ? (
                    <button type="submit" className="login-btn">
                      Login
                    </button>
                  ) : (
                    <button type="submit" className="login-btn">
                      sign up
                    </button>
                  )}
                </div>
                <p className="or">or</p>

                <div className="option">
                  <p>
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <span
                          onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                          }}
                        >
                          create new one
                        </span>
                      </>
                    ) : (
                      <>
                        already have an account?{" "}
                        <span
                          onClick={() => {
                            setIsLogin(!isLogin);
                            resetForm();
                          }}
                        >
                          login
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
