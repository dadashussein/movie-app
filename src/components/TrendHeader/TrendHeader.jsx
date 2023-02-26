import React from "react";
import "./trendheader.css";

const TrendHeader = (props) => {
  return (
    <div className="trend-header__trend">
      <div className="trend-header__trend__title">{`${
        props.language === "en-US" ? "Trending" : "Şimdi Trendde"
      }`}</div>
      <div className="trend-header__trend__subtitle">{`${
        props.language === "en-US"
          ? "See what's trending"
          : "Trende olanları gör"
      }`}</div>
    </div>
  );
};

export default TrendHeader;
