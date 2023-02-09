import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./overdetail.css";

const Overdetail = () => {
  const { id } = useParams();
  const IMG_PATH = "https://image.tmdb.org/t/p/original";
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [id]);

  const {
    title,
    vote_average,
    release_date,
    overview,
    poster_path,
    genres,
    original_language,
    runtime,
    budget,
    homepage,
    popularity,
    backdrop_path,
    tagline,
  } = data;

  const runTime = () => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}H ${minutes}m`;
  };

  const budgetInMillion = () => {
    return budget / 1000000;
  };

  const popularityInMillion = () => {
    return popularity;
  };
  const backgroundStyle = {
    backgroundImage: `url(${IMG_PATH + backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "0.5rem",
  };


  const releseDate = () => {
    return release_date?.slice(0, 4);
  };

  return (
    <div className="detail-container" style={backgroundStyle}>
      <div className="back">
        <a
          href={homepage}
          rel="noreferrer"
          target="_blank"
        >
          {title}
        </a>
        <p className="tagline">{tagline}</p>

        <div className="card-title">
          <span className=" uppercase">{releseDate()}</span>
          <span className=" uppercase">{original_language}</span>
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
              <div className="addition">
              <div className="imdb">
                <p className="text-white">IMDB :</p>
                <p className="text-white">{vote_average}/10</p>
              </div>
              <div className=" budget">
                <p className="text-white">Budget :</p>
                <p className="text-white">{budgetInMillion()}M</p>
              </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overdetail;
