import { Field, Formik, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";

import { AiOutlineArrowRight as Arrow } from "react-icons/ai";
import "./ForgetPassword.css";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function ResetPassword({ setUserEmail }) {
  let data = JSON.parse(localStorage.getItem("users"));
  let history = useNavigate();

  const [isVerify, setIsVerify] = useState(false);
  const [isInputingPass, setIsInputingPass] = useState(false);
  const [varifiCode, setVarifiCode] = useState("");

  const initValues = {
    email: "",
    code: "",
    password: "",
  };

  const onSubmit = ({ email }, { setErrors }) => {
    // check if email already exists

    if (!data.some((item) => item.email === email)) {
      setErrors({ email: "Email doesn't exist" });
    } else {
      setIsVerify(true);
      emailjs
        .send(
          "service_tddrxo9",
          "template_apoog0a",
          {
            to_name: "There",
            message: `Your varification code is : ${varifiCode}`,
            person: email,
          },
          "fti2dLSAc6fpDfBvh"
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const varSubmit = ({ code }, { setErrors }) => {
    if (code === varifiCode) {
      setIsVerify(false);
      setIsInputingPass(true);
    } else {
      setErrors({ code: "Incorrect" });
    }
  };

  const passSubmit = ({ email, password }) => {
    const newData = data.map((user) =>
      user.email === email
        ? {
            ...user,
            password,
          }
        : user
    );

    localStorage.setItem("users", JSON.stringify(newData));
    setUserEmail(email);

    history("/home");
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invaild")
      .required("This field is required")
      .matches(/\.([a-z]{2,4})$/, "Email should conatin domain name"),
  });

  const varVaildation = Yup.object({
    code: Yup.string().required("This field is required"),
  });

  const passVaildation = Yup.object({
    password: Yup.string()
      .required("This field is required")
      .min(8, "must contain at least 8 characters")
      .max(16, "can't be more than 16 letters")
      .matches(/[A-Z]/, "should contain at least one letter uppercase")
      .matches(/[a-z]/, "should contain at least one letter lowercase")
      .matches(/\W/, "should contain at least one special character")
      .matches(/\d/, "should contain at least one digit"),
  });

  const varificationGenerate = () => {
    let res = [];

    for (let i = 1; i < 6; i++) {
      res.push(Math.floor(Math.random() * i + (i + 2)));
    }
    return res.join("");
  };

  const sendAgain = (values) => {
    let varCodeAlt = varificationGenerate();

    emailjs
      .send(
        "service_tddrxo9",
        "template_apoog0a",
        {
          to_name: "There",
          message: `Your varification code is : ${varCodeAlt}`,
          person: values.email,
        },
        "fti2dLSAc6fpDfBvh"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setVarifiCode(varCodeAlt);
  };

  // make varification code
  !varifiCode && setVarifiCode(varificationGenerate());

  return (
    <div className="wrapper">
      <div className="rest-container">
        <div className="reset">
          <h3>Reset password</h3>
          <p>
            {isVerify
              ? "Enter the varification code we just sent"
              : isInputingPass
              ? "Enter your new password"
              : "Enter the email address of your account"}
          </p>

          <Formik
            initialValues={initValues}
            onSubmit={
              isVerify ? varSubmit : isInputingPass ? passSubmit : onSubmit
            }
            validationSchema={
              isVerify
                ? varVaildation
                : isInputingPass
                ? passVaildation
                : validationSchema
            }
          >
            {({ values }) => {
              return (
                <Form>
                  {isVerify ? (
                    <>
                      {" "}
                      <label htmlFor="email">Code</label>
                      <Field type="text" name="code" id="code" />
                      <ErrorMessage
                        name="code"
                        component="p"
                        className="errorMsg"
                      />
                      <button
                        className="send-again"
                        onClick={(e) => sendAgain(values)}
                        type="button"
                      >
                        send again
                      </button>
                      <button type="submit" className="next">
                        <Arrow />
                      </button>
                    </>
                  ) : isInputingPass ? (
                    <>
                      {" "}
                      <label htmlFor="password">Password</label>
                      <Field type="text" name="password" id="password" />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="errorMsg"
                      />
                      <button type="submit" className="next">
                        Reset
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <label htmlFor="email">Email</label>
                      <Field type="text" name="email" id="email" />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="errorMsg"
                      />
                      <button type="submit" className="next">
                        <Arrow />
                      </button>
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
