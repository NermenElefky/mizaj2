import React from "react";
import { FiPhoneCall as Phone } from "react-icons/fi";
import { AiOutlineMail as Email } from "react-icons/ai";
import { GoLocation as Address } from "react-icons/go";
import { RxStopwatch as OpeningHour } from "react-icons/rx";
import { styled } from "styled-components";

function About() {
  return (
    <AboutContainer>
      <div className="vision">
        <p className="bg-pra">MIZAJ</p>
        <div className="vision-text">
          <p>
            <span>Welcome to mizaj</span>. <br /> We are passionate about
            serving the finest quality coffee, tea, milk and snacks and creating
            a warm and inviting atmosphere for our customers.
          </p>
        </div>
      </div>
      <div className="about-details">
        <div className="phones">
          <div className="icon">
            <Phone />
          </div>
          <div className="d-text">
            <h2>Call us</h2>
            <p className="phone-n">(+20) 128-234-4561</p>
            <p className="phone-n">(+20) 148-874-2834</p>
          </div>
        </div>

        <div className="email">
          <div className="icon">
            <Email />
          </div>
          <div className="d-text">
            <h2>Email</h2>
            <p className="email-d">mizajcoffee@gmail.com</p>
          </div>
        </div>

        <div className="address">
          <div className="icon">
            <Address />
          </div>
          <div className="d-text">
            <h2>Address</h2>
            <p className="address-d">Cairo</p>
            <a
              className="view"
              href="https://www.google.com/maps/place/Mizaj+art+academy/@30.0806827,31.3383341,17z/data=!3m1!4b1!4m6!3m5!1s0x14583f2cdc455ab7:0x1b69f2273d2de71d!8m2!3d30.0806827!4d31.3357592!16s%2Fg%2F11jrmcmpr9?entry=ttu"
            >
              View in google
            </a>
          </div>
        </div>

        <div className="hours">
          <div className="icon">
            <OpeningHour />
          </div>
          <div className="d-text">
            <h2>Opening hours</h2>
            <p className="hours-d">All days except weekend from 10 : 11</p>
            <p className="hours-d">Weekend from 4 : 11</p>
          </div>
        </div>
      </div>
    </AboutContainer>
  );
}

export default About;
const AboutContainer = styled.div`
  margin-top: 33px;

  .vision{
    background: var(--blue-color);
    padding: 63px 32px;
    border-radius: 6px;
    position: relative;
    margin-bottom: 30px;
}
.vision .bg-pra{
  font-size: 85px;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    color: #fafafa36;
}
.vision-text{
  z-index: 2;
    position: relative;
    display : flex;
    justify-content : center;

}
.vision-text p {
  color: #fff;
    font-size: 18.75px;
    text-align: center;
    line-height: 1.8;
    font-weight : 400;
    max-width : 625px;
}
.vision-text span {
  text-transform: uppercase;
    color: #ffc107;
    font-size: 27.5px;
    font-weight : 600;
}
.about-details {
  display: flex;
    flex-wrap: wrap;
    justify-content : space-around;
}
.about-details > div {
  background: #fff;
    padding: 26px;
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
    width : 237.5px;
}
.phones {
  border-top: 2px solid var(--blue-color);
}
.email {
  border-top: 2px solid var(--pink-color);
}
.address {
  border-top: 2px solid green;
}
.hours {
  border-top: 2px solid orange;
}
.about-details .icon {
  margin-bottom : 10px;
  font-size : 20px;
}
.phones svg {
  color: var(--blue-color)
}
.email svg {
  color : var(--pink-color);
}
.address svg {
  color : green;
}
.hours svg {
  color: orange;
}
.about-details .d-text {
  font-size : 18.75px;
}
.about-details h2 {
  font-size: 1em;
    margin-bottom: 10px
}
.phone-n{
  border: 1px solid var(--blue-color);
    padding: 4px;
    font-size: .8em;
    width: 162.5px;
    margin-bottom: 10px;
    border-radius: 4px;
    text-align : center;
}
.email-d {
  font-size: .9em;
}
.view {
  font-size: .9em;
    border-radius: 3px;
    border: 1px solid green;
    padding: 6px 7px;
    margin-top: 10px;
    text-transform: capitalize;
    color: #000;
    text-align : center;
    display : block;
}
.address-d {
  font-size : .9em;
}
.hours-d {
  font-size: .9em;
    margin-bottom: 10px;
}
}
`;
