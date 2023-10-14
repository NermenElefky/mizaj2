import React from "react";
import DownloadApp from "./DownloadApp";
import Oreder from "./Oreder";
import TrendingDrinks from "./TrendingDrinks";

function Home() {
  return (
    <div className="home-container">
      <div className="main-part">
        <DownloadApp />
        <Oreder />
      </div>
      <div className="side-part">
        <TrendingDrinks />
      </div>
    </div>
  );
}

export default Home;
