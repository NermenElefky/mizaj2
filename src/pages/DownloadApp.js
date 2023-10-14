import React from "react";
import { styled } from "styled-components";
import downloadImage from "../assests/download_colored.png";
import { FaGooglePlay as GooglePlay, FaApple as Iphone } from "react-icons/fa";

function DownloadApp() {
  return (
    <DownloadContainer>
      <div className="desc">
        <h1>Welocme to Mizaj</h1>
        <p>Start your day with coffee and some snacks</p>
      </div>
      <div className="download">
        <div className="download-desc">
          <h3>Download our app</h3>
          <p>Have everything you need at your finger tip.</p>
          <button>
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GooglePlay /> download now
            </a>
          </button>
          <button>
            <a
              href="https://www.apple.com/store"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <Iphone /> download now
            </a>
          </button>
        </div>
        <div className="download-img">
          <img src={downloadImage} alt="cup of coffee" className="first-one" />
          <img src={downloadImage} alt="cup of coffee" className="sloped-one" />
          <span className="pink-one"></span>
          <span className="blue-one"></span>
          <span className="pink-two"></span>
          <span className="blue-two"></span>
        </div>
      </div>
    </DownloadContainer>
  );
}

export default DownloadApp;
const DownloadContainer = styled.div`
  font-size: 33.75px;
  max-width: 1398.25px;
  .desc {
    padding: 0px 20px;
  }
  .desc p {
    font-size: 0.5em;
    margin-left: 41px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  h1 {
    font-size: 1em;
    color: transparent;
    background: linear-gradient(
      45deg,
      var(--pink-color) 30%,
      var(--blue-color) 50%
    );
    -webkit-background-clip: text;
    background-size: 200%;
    animation: mizaj 7s ease-in-out infinite forwards;
    text-transform: upperCase;
  }
  .download {
    background: #fff;
    padding: 13px 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 192.5px;
    overflow: hidden;
  }
  .download-desc h3 {
    font-size: 0.9em;
    text-transform: capitalize;
  }
  .download-desc p {
    font-size: 0.55em;
    margin: 5px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .download-desc button {
    padding: 10px;
    border-radius: 5px;
    text-transform: capitalize;
    transition: 0.5s;
  }
  .download-desc button a {
    display: inline-flex;
    align-items: center;
    font-size: 17px;
    width: 156px;
  }
  .download-desc button:first-of-type:hover {
    background: #6faeecde;
    color: #000;
  }
  .download-desc button:last-of-type:hover {
    background: #e9e3e35e;
  }
  .download-desc button svg {
    font-size: 16px;
    margin-right: 5px;
  }
  .download-desc button:first-of-type {
    margin-right: 9px;
    background: var(--blue-color);
    margin-bottom: 6px;
  }
  .download-desc button:first-of-type a {
    color: #fff;
  }
  .download-desc button:last-of-type a {
    color: #000;
  }
  .download-img {
    position: relative;
    display: flex;
  }
  .download img {
    width: 175px;
  }
  .sloped-one {
    transform: rotate(-15deg) translateY(-16px);
  }
  .first-one {
    transform: rotate(34deg) translateX(42px) translateY(-20px);
  }
  .download-img span {
    display: inline-block;
    width: 16.25px;
    height: 16.25px;
    position: absolute;
  }
  .blue-one {
    border-radius: 50%;
    right: 19px;
    background: var(--blue-color);
  }
  .download-img .blue-two {
    background: var(--blue-color);
    right: 40%;
    width: 45px;
    top: 8px;
    height: 5px;
    transform: rotate(-16deg);
    border-radius: 0px;
  }
  .pink-one {
    // background: var(--pink-color);
    bottom: 0;
    right: 41%;
    transform: rotate(45deg);
    background: linear-gradient(
      120deg,
      var(--pink-color) 40%,
      var(--blue-color) 60%
    );
    background-size: 200%;
    animation: mizaj linear 5s infinite forwards,
      pink-one linear 5s infinite forwards;
  }
  .pink-two {
    background: var(--pink-color);
    left: 20%;
    top: 40px;
    border-radius: 50%;
  }
  @keyframes pink-one {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes mizaj {
    0%,
    100% {
      background-position: top-left;
    }
    50% {
      background-position: top right;
    }
  }

  @media (max-width: 1200px) {
    .download img {
      width: 153px;
    }
    .download-desc {
      font-size: 26px;
    }
  }
  @media (max-width: 820px) {
    .download-desc {
      font-size: 28.75px;
    }
  }
  @media (max-width: 700px) {
    .download-desc {
      z-index: 3;
      text-align: center;
      color: #fff;
      font-size: 33.75px;
    }
    .download-img {
      position: absolute;
    }
    .download::after {
      content: "";
      background: #000;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.5;
    }
    .download {
      position: relative;
      justify-content: center;
      align-items: center;
      min-height: 240px;
    }
  }
  @media (max-width: 500px) {
    font-size: 27.5px;
  }
  @media (max-width: 400px) {
    .desc p {
      margin-left: 13px;
    }
  }
  @media (max-width: 500px) {
    .download-desc {
      font-size: 28px;
    }
  }
`;
