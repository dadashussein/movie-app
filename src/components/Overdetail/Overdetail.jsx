import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetail, fetchCredit } from "../../stores/thunks/detailThunks";
import "./overdetail.css";

const Overdetail = ({ language }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, imdbRating, cast, crew } = useSelector(
    (state) => state.detail
  );

  const [circlePercentage, setCirclePercentage] = useState();
  const IMG_PATH = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchDetail({ id: `${id}`, language: `${language}` }));
    dispatch(fetchCredit({ id: `${id}` }));
  }, [id, language, dispatch]);

  useEffect(() => {
    setCirclePercentage((imdbRating / 10) * 100);
  }, [imdbRating]);

  const {
    title,
    release_date,
    overview,
    poster_path,
    genres,
    original_language,
    runtime,
    homepage,
    backdrop_path,
    tagline,
  } = movie;

  // Helper function to format the runtime as "Xh Ym"
  const runTime = () => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}H ${minutes}m`;
  };

  // Style object for the background image
  const backgroundStyle = {
    backgroundImage: `url(${IMG_PATH + backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0.5rem",
  };

  // Helper function to extract the year from the release date
  const releseDate = () => {
    return release_date?.slice(0, 4);
  };

  // Helper function to determine the color of the circle based on the circle percentage
  const changeColorPercentage = () => {
    if (circlePercentage < 60) {
      return "red";
    } else if (circlePercentage < 80) {
      return "orange";
    } else {
      return "green";
    }
  };

  return (
    <div className="detail-container" style={backgroundStyle}>
      <div className="back">
        <a href={homepage} className="title" rel="noreferrer" target="_blank">
          {title}
        </a>
        <p className="tagline">{tagline}</p>

        <div className="card-title">
          <span>{releseDate()}</span>
          <span>{original_language}</span>
          <span>{runTime()}</span>
        </div>

        <div className="card-body">
          <img src={IMG_PATH + poster_path} alt="" />

          <div className="description">
            <div className="card-body__gene">
              {genres?.map((genre) => {
                return <p key={genre.id}>{genre.name}</p>;
              })}
            </div>

            <div className="card-body__text">
              <span className="overview">{overview}</span>

              <div className="imdb">
                <p>IMDB :</p>

                <div className="wrapper">
                  <svg
                    className="circle-chart"
                    viewBox="0 0 33.83098862 33.83098862"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="circle-chart-background"
                      stroke="transparent"
                      strokeWidth="2"
                      fill="none"
                      cx="16.9"
                      cy="16.9"
                      r="15.9"
                    />
                    <circle
                      className="circle-chart-circle"
                      stroke={changeColorPercentage()}
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      fill="rgba(0,0,0,0.4)"
                      transform="rotate(-90 16.9 16.9)"
                      cx="16.9"
                      cy="16.9"
                      r="15.9"
                      style={{
                        strokeDasharray: `${circlePercentage}, 100`,
                      }}
                    />
                    <text
                      className="circle-chart-percent"
                      x="18"
                      y="20"
                      fontSize=".7em"
                      fontWeight="bold"
                      fill="white"
                      textAnchor="middle"
                    >
                      {circlePercentage}%
                    </text>
                  </svg>
                </div>
              </div>

              <div className="card-body__crew">
                <span>{language === "en-US" ? "Director" : "Yönetmen"}:</span>

                {crew.map((direct) => (
                  <p key={direct.id}>{direct.name}</p>
                ))}
              </div>
              <div className="card-body__cast">
                <span>{language === "en-US" ? "Cast" : "Oyuncular"}:</span>
                {cast.slice(0, 3).map((actor) => (
                  <p key={actor.id}>{actor.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overdetail;
