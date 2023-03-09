import React from "react";
import "./trendheader.css";
const TrendHeader = ({ language }) => (
  <div className="trend-header__trend">
    <div className="trend-header__trend__title">
      {language === "en-US" ? "Trending" : "Şimdi Trendde"}
    </div>
    <div className="trend-header__trend__subtitle">
      {language === "en-US" ? "See what's trending" : "Trende olanları gör"}
    </div>
  </div>
);
export default TrendHeader;