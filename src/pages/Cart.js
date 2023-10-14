import React, { useContext, useState } from "react";
import { CarteDishes, MizajStore } from "../components/Context";
import styled from "styled-components";
import OrderDishDes from "../components/OrderDishDes";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import SubmitSuccess from "../components/SubmitSuccess";
import CartEmpty from "../components/CartEmpty";
import { makeNotify } from "../GlobalFunctions.js/GlobalFuncs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function Cart({ name, price }) {
  const { user, data, userEmail, setMakingRender, makingRender } =
    useContext(MizajStore);
  const { cartDishs, setCartDishs, orderId, setOrderId } =
    useContext(CarteDishes);

  const [isSubmitted, setIsSubmitted] = useState(false);

  let history = useNavigate();
  const generateId = () => {
    let newId = [];
    let idMaterials = {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      lettersSmall: "abcdefghiklmnopqrstvxyz",
      lettersCap: "ABCDEFGHIKLMNOPQRSTVXYZ",
    };

    for (const key in idMaterials) {
      for (let i = 0; i < 2; i++) {
        newId.push(idMaterials[`${key}`][Math.round(Math.random() * 3)]);
      }
    }

    return newId.join("");
  };

  const initValues = {
    address: "",
    phone: user && user.phones.length ? user.phones[0] : "",
  };

  const onSubmit = (values, { setFieldError }) => {
    let currentDate = new Date();

    let isPhonesVaild = values.phone.match(/[0-9]/gm).length === 11;

    if (isPhonesVaild) {
      if (userEmail) {
        let orderInfo = {
          orderId,
          address: values.address,
          phone: values.phone,
          time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
          date: `${currentDate.getDate()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getFullYear()}`,
          fullDate: currentDate,
          details: cartDishs,
        };

        let newData = data.map((user) => {
          if (user.email === userEmail) {
            user.orders.push(orderInfo);
            return user;
          } else {
            return user;
          }
        });
        localStorage.setItem("users", JSON.stringify(newData));

        // change the state
        setIsSubmitted(true);
        setCartDishs([]);
        setOrderId("");

        // make a notify
        makeNotify(
          "your order has been submitted.",
          "Go to orders section to see you current orders. You can download our App and track your order.",
          `${new Date()}`,
          userEmail
        );

        // let's make timeout with time that order will have to arrive after 2 hours
        setTimeout(() => {
          // after time add the order to history and remove it from orders
          let newData = data.map((user) => {
            if (user.email === userEmail) {
              // add it to history
              user.history.push({
                ...orderInfo,
                status: "completed",
              });

              // remove it from orders
              let newOrders = user.orders.filter(
                (item) => item.orderId !== orderId
              );
              return { ...user, orders: newOrders };
            } else {
              return user;
            }
          });
          // set it to local storage
          localStorage.setItem("users", JSON.stringify(newData));

          // just for updating content
          setMakingRender(!makingRender);
        }, 7200000);
      } else {
        history("/login");
      }
    } else {
      setFieldError(`phone`, "must contain 11 number");
    }

    // get order info
  };

  const vaildationSchema = Yup.object({
    address: Yup.string().required("This field is required!!"),
    phone: Yup.string()
      .required("This field is required!!")
      .matches(/^([0-9]|-)+$/, "only numbers"),
  });

  // make the order id
  !orderId && setOrderId(generateId());

  // formating for phone number
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

  return (
    <>
      {cartDishs.length > 0 ? (
        <CartWrapper>
          <div className="before-submit">
            <div className="cart-info">
              <p>
                <span>order:</span>#{orderId}
              </p>
            </div>
            <Formik
              initialValues={initValues}
              onSubmit={onSubmit}
              validationSchema={vaildationSchema}
            >
              {({ setFieldValue }) => {
                return (
                  <Form>
                    <label htmlFor="address">Address</label>
                    <Field type="text" name="address" id="address" />
                    <ErrorMessage
                      component="p"
                      name="address"
                      className="errorMsg"
                    />

                    <label htmlFor="phone">Phone</label>
                    <Field
                      type="tel"
                      name="phone"
                      maxLength={13}
                      id="phone"
                      onBlur={(e) => {
                        setFieldValue("phone", formatInput(e));
                      }}
                    />
                    <ErrorMessage
                      component="p"
                      name="phone"
                      className="errorMsg"
                    />

                    <button type="submit" className="submit-order">
                      Submit Order
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="cartDishWrapper">
            {cartDishs.map((item) => (
              <OrderDishDes
                name={item.name}
                price={item.price}
                img={item.img}
                size={item.size}
                qty={item.qty}
                cartDishs={cartDishs}
                setCartDishs={setCartDishs}
                key={uuidv4()}
              />
            ))}
          </div>
        </CartWrapper>
      ) : isSubmitted ? (
        <SubmitSuccess />
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default Cart;

const CartWrapper = styled.div`
  margin-top: 30px;

  .cartDishWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 30px;
  }
  .before-submit {
    background: #fff;
    padding: 13px;
    border-radius: 7px;
    position: relative;
  }
  .cart-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart-info p {
    font-size: 15px;
    display: flex;

    align-items: center;
  }
  .cart-info span {
    text-transform: capitalize;
    color: var(--blue-color);
    margin-right: 4px;
    font-size: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  form label {
    font-size: 15px;
    letter-spacing: 0.4px;
    margin: 13px 0px 5px;
  }
  form input {
    max-width: 250px;
    padding: 4px 10px;
    border: 1px solid var(--blue-color);
    border-radius: 3px;
    font-size: 16px;
  }
  .errorMsg {
    text-align: start;
    margin-top: 5px;
  }
  button.submit-order {
    padding: 5px;
    border-radius: 4px;
    color: #fff;
    background: var(--pink-color);
    transition: 0.5s;
    border: 1px solid var(--pink-color);
    position: absolute;
    top: 14px;
    right: 14px;
    font-size: 16px;
  }
  button.submit-order:hover {
    color: var(--pink-color);
    background: #fff;
  }
`;
