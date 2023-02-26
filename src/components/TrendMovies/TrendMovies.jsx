import "./trendmovies.css";
import { Link } from "react-router-dom";

const TrendMovies = (props) => {
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    original_language,
  } = props.movie;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  //function to get color
  const getColor = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "yellow";
    } else {
      return "red";
    }
  };

  //function to filter release date
  const filterReleaseDate = () => {
    return release_date.split("-")[0];
  };

  //function to filter title
  const filterTitle = () => {
    if (title.length > 20) {
      return title.substring(0, 20) + "...";
    } else {
      return title;
    }
  };
  return (
    <>
      <article
        className="trend-container"
        style={{ animation: "open 1s ease-in-out" }}
      >
        <div className="trend-container__content">
          <div className="trend-container__content__card">
            <img id="img" src={IMG_PATH + poster_path} alt={title} />
            <div className="card-body">
              <h1 className="card-title">{filterTitle()}</h1>
              <div className="card-text">
                <span
                  style={
                    getColor(vote_average) === "green"
                      ? { border: "1.2px solid green" }
                      : getColor(vote_average) === "yellow"
                      ? { border: "1.2px solid yellow" }
                      : { border: "1.2px solid red" }
                  }
                >
                  {vote_average.toFixed(1)}
                </span>
                <p>{filterReleaseDate()}</p>
                <p>{original_language}</p>
              </div>

              <Link to={`/overdetail/${id}`}>{`${
                props.language === "en-US" ? "More" : "Daha Fazla"
              }`}</Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default TrendMovies;
