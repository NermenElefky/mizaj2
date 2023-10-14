import React, { useContext, useState } from "react";
import "./Profile.css";
import profileImg from "../assests/profile-img3.avif";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { FiEdit3 as Edit } from "react-icons/fi";
import { MizajStore } from "../components/Context";

function Profile() {
  const { userEmail, setMakingRender, makingRender } = useContext(MizajStore);

  // get the data from local stotage
  let data = JSON.parse(localStorage.getItem("users"));
  // the logged user
  let user = data.find((item) => item.email === userEmail);

  const [profileImage, setProfileImage] = useState(user.photo);
  // make the component render when saving changes
  const [toMakeRender, setToMakeRender] = useState(false);
  // for type of password
  const [passwordType, setPasswordType] = useState("password");

  const personalInit = {
    name: user.name,
    bio: user.bio,
  };
  const initValues = {
    email: user.email,
    phones: user.phones,
    password: user.password,
  };

  const personalVaildation = Yup.object({
    name: Yup.string()
      .required("This field is required")
      .matches(/^[a-zA-Z0-9]/, "should start with letters or numbers")
      .min(3, "must contain at least 3 characters")
      .max(15, "can't be more than 15 letters")
      .matches(/^(\w|\s)+$/, "name shouldn't contain special characters"),

    bio: Yup.string().max(30, "can't be more than 28 letters"),
  });
  const validationSchema = Yup.object({
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

    phones: Yup.array().of(
      Yup.string()
        .required("This field is required!!")
        .matches(/^([0-9]|-)+$/, "only numbers")
    ),
  });

  const onSubmit = (values) => {
    const newData = data.map((item) =>
      item.email === userEmail
        ? {
            ...item,
            name: values.name,
            bio: values.bio,
          }
        : item
    );

    localStorage.setItem("users", JSON.stringify(newData));
    setToMakeRender(!toMakeRender);
  };

  const privateSubmit = (values, { setFieldError }) => {
    // check if phone is correct or not
    let isPhonesVaild = values.phones.every(
      (phone) => phone.match(/[0-9]/gm).length === 11
    );

    if (isPhonesVaild) {
      const newData = data.map((item) =>
        item.email === userEmail
          ? {
              ...item,
              password: values.password,
              phones: values.phones,
            }
          : item
      );

      localStorage.setItem("users", JSON.stringify(newData));
      setToMakeRender(!toMakeRender);
      setPasswordType("password");
    } else {
      values.phones.map((phone, index) => {
        if (phone.match(/[0-9]/gm).length !== 11) {
          setFieldError(`phones[${index}]`, "must contain 11 number");
        }
      });
    }
  };

  const changeProfilePhoto = (e) => {
    let uploadedImage = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      setProfileImage(reader.result);
    });

    if (uploadedImage) {
      reader.readAsDataURL(uploadedImage);
    }

    // show the save changes button
    document.getElementsByClassName("special-btn")[0].style.display = "block";
  };

  const formatInput = (e) => {
    let val = e.target.value;
    let groups = val.match(/(\d{1,4}-?)(\d{1,3}-?)?(\d{1,4})?/);

    let newRes =
      groups &&
      groups
        .slice(1, groups[3] ? 4 : 3)
        .map((item, index) => {
          return item && index < groups.length - 2 && !item.includes("-")
            ? item + "-"
            : item;
        })
        .join("");
    return newRes;
  };

  const ChangePassword = (e) => {
    let inputPassword = e.target.parentElement.nextElementSibling;
    inputPassword.style.pointerEvents = "auto";
    // make cursor at the end of the text to add more
    inputPassword.setSelectionRange(
      inputPassword.value.length,
      inputPassword.value.length
    );
    inputPassword.focus();
    // change password type to text to be shown
    setPasswordType("text");
  };

  const savePhoto = (e) => {
    const newData = data.map((item) =>
      item.email === userEmail
        ? {
            ...item,
            photo: profileImage,
          }
        : item
    );

    localStorage.setItem("users", JSON.stringify(newData));

    setTimeout(() => {
      e.target.style.display = "none";
    }, 1000);
    // make context to render to make header apply changes
    setMakingRender(!makingRender);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header-info">
          <div className="profileImageParent">
            <img src={profileImage} alt="profile" />
            <Edit className="editIcon" />
            <div className="input-file-container">
              <input type="file" onChange={changeProfilePhoto} />
            </div>
          </div>
          <p>{user.name}</p>
        </div>
        <button
          className="saveChanges special-btn"
          style={{ display: "none" }}
          onClick={savePhoto}
        >
          Save Changes
        </button>
      </div>
      <div className="profile-content">
        <div className="personal">
          <h3>Personal info</h3>
          <Formik
            initialValues={personalInit}
            validationSchema={personalVaildation}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ dirty }) => {
              return (
                <Form>
                  <button
                    type="submit"
                    disabled={!dirty}
                    className="saveChanges"
                  >
                    Save Changes{" "}
                  </button>
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="inputName"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="errorMessage"
                  />

                  <label htmlFor="bio">Bio</label>
                  <Field as="textarea" type="text" name="bio" id="bio" />
                  <ErrorMessage
                    name="bio"
                    component="p"
                    className="errorMessage"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="private">
          <h3>private info</h3>
          <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={privateSubmit}
            enableReinitialize
          >
            {({ dirty }) => {
              return (
                <Form>
                  <button
                    type="submit"
                    disabled={!dirty}
                    className="saveChanges save-private"
                  >
                    Save Changes{" "}
                  </button>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="profile-email"
                  />

                  <label htmlFor="password" className="password-label">
                    password{" "}
                    <button
                      className="change-password"
                      onClick={ChangePassword}
                      type="button"
                    >
                      Change
                    </button>
                  </label>
                  <Field type={passwordType} name="password" id="password" />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="errorMessage"
                  />

                  <label htmlFor="phone">Phone</label>
                  <FieldArray name="phones">
                    {({ form, push, remove }) => {
                      let phones = form.values.phones;
                      return phones.map((phone, index) => {
                        return (
                          // take care key should be static to save the updated value
                          // in it and not making now key to store the value
                          <div className="phone-container" key={index}>
                            <Field
                              type="tel"
                              maxLength={13}
                              name={`phones.${index}`}
                              onBlur={(e) =>
                                form.setFieldValue(
                                  `phones.${index}`,
                                  formatInput(e)
                                )
                              }
                            />
                            <div className="btns-container">
                              <button
                                className="phone-btn increase"
                                type="button"
                                onClick={() => {
                                  push("");
                                }}
                              >
                                +
                              </button>
                              {phones.length > 1 && (
                                <button
                                  className="phone-btn decrease"
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  -
                                </button>
                              )}
                            </div>
                            <ErrorMessage
                              name={`phones[${index}]`}
                              component="p"
                              className="errorMessage"
                            />
                          </div>
                        );
                      });
                    }}
                  </FieldArray>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="profile-more">
          <div className="orders">
            <h4>orders</h4>
            <p>{user.orders.length ? user.orders.length : 0}</p>
          </div>
          <div className="favorites">
            <h4>favorites</h4>
            <p>{user.favorites.length ? user.favorites.length : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
