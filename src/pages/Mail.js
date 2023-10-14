import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { styled } from "styled-components";
import MsgSubmitted from "../components/MsgSubmitted";

function Mail() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialValues = {
    email: "",
    message: "",
  };
  const onSubmit = (values) => {
    setIsSubmitted(true);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invaild")
      .required("This field is required")
      .matches(/\.([a-z]{2,4})$/, "Email should conatin domain name"),

    message: Yup.string().required("This field is required"),
  });
  return (
    <>
      {isSubmitted ? (
        <MsgSubmitted />
      ) : (
        <MailContainer className="mail">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <label htmlFor="email">
                <span>Email</span>
                <Field type="email" name="email" id="email" />
                <ErrorMessage name="email" component="p" className="errorMsg" />
              </label>
              <label htmlFor="message">
                <span>Message</span>
                <Field
                  as="textarea"
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Type your message here !!"
                />
                <ErrorMessage
                  name="message"
                  component="p"
                  className="errorMsg"
                />
              </label>

              <button type="submit" className="submit-message">
                Send
              </button>
            </Form>
          </Formik>
        </MailContainer>
      )}
    </>
  );
}

export default Mail;

const MailContainer = styled.div`
  margin-top: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;

  @media (max-width: 500px) {
    margin-top: 60px;
  }
  form {
    padding: 20px;
    width: 100%;
    max-width: 625px;
    background: #fff;
  }
  label {
    display: flex;
    flex-flow: column;
    position: relative;
    margin-bottom: 13px;
  }
  input {
    background: var(--hover-color);
    padding: 10px;
    margin-top: 14px;
    font-size: 17px;
  }
  span {
    font-size: 18.75px;
  }
  textarea {
    resize: none;
    min-height: 174px;
    margin-top: 13px;
    background: var(--hover-color);
    border: 0;
    outline: 0;
    padding: 10px;
    font-size: 17px;
  }
  .submit-message {
    background: var(--hover-color);
    color: #000;
    padding: 9px 22px;
    border-radius: 3px;
    border: 1px solid var(--hover-color);
    font-size: 16px;
  }
  .submit-message:hover {
    background: #fff;
    color: var(--blue-color);
  }
  @media (max-width: 500px) {
    form {
      padding: 11px;
      width: calc(100% - 11px);
    }
  }
`;
