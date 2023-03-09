import React from "react";
import { Link } from "react-router-dom";

const SearchMovies = ({ movie, language }) => {
  const { id, title, poster_path, vote_average, release_date, original_language } = movie;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const getColor = (vote) => {
    return vote >= 8 ? "green" : vote >= 6 ? "yellow" : "red";
  };
  const filterReleaseDate = () => release_date.split("-")[0];
  const filterTitle = () => title.length > 20 ? title.substring(0, 20) + "..." : title;
  return (
    <article className="trend-container" style={{ animation: "open 1s ease-in-out" }}>
      <div className="trend-container__content">
        <div className="trend-container__content__card">
          <img id="img" src={`${IMG_PATH}${poster_path}`} alt={title} />
          <div className="card-body">
            <h1 className="card-title">{filterTitle()}</h1>
            <div className="card-text">
              <span style={{ border: `1.2px solid ${getColor(vote_average)}` }}>
                {vote_average.toFixed(1)}
              </span>
              <p>{filterReleaseDate()}</p>
              <p>{original_language}</p>
            </div>
            <Link to={`/overdetail/${id}`}>{language === "en-US" ? "More" : "Daha Fazla"}</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchMovies;