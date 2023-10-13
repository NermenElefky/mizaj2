import React from "react";
import animationData from "../lotties/noNotification.json";
import Lottie from "react-lottie";

function EmptyNotification() {
  return (
    <Lottie
      options={{ animationData, autoplay: true, loop: true }}
      height={500}
      className="noNotification"
    />
  );
}

export default EmptyNotification;
