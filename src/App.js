import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchMovies from "./components/SearchMovies/SearchMovies";
import TrendMovies from "./components/TrendMovies/TrendMovies";
import TrendHeader from "./components/TrendHeader/TrendHeader";
import Overdetail from "./components/Overdetail/Overdetail";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendMovies,
  fetchSearchMovies,
} from "./stores/thunks/movieThunks";

function App() {
  const dispatch = useDispatch();
  const { trendMovies, status } = useSelector((state) => state.movies);
  const [language, setLanguage] = useState("en-US");
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchTrendMovies({ language: `${language}` }));
  }, [dispatch, language]);

  useEffect(() => {
    if (search) {
      dispatch(
        fetchSearchMovies({ language: `${language}`, search: `${search}` })
      )
        .then((res) => {
          setMovies(res.payload);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, search, language]);

  let myTrend = trendMovies.slice(0, 8);

  // animation for the trend movies
  const displayTrend = async () => {
    if (index < myTrend.length) {
      await new Promise((resolve) => {
        setTimeout(resolve, 200);
      });
      setIndex(index + 1);
    }
  };
  displayTrend();

  // animation for the search movies
  const displayMovies = async () => {
    if (index < movies.length) {
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });
      setIndex(index + 1);
    }
  };
  displayMovies();

  if (status === "loading") {
    return (
      <>
        <div>loading</div>
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <form className="lang-switcher">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en-US">EN</option>
                  <option value="tr-TR">TR</option>
                </select>
              </form>

              <Header setSearch={setSearch} language={language} />
              {search ? null : <TrendHeader language={language} />}

              <div className="app-trendvideos">
                {myTrend
                  .slice(0, index)
                  .map((movie) =>
                    movie.poster_path &&
                    movie.length === 0 ? null : search ? null : (
                      <TrendMovies
                        movie={movie}
                        language={language}
                        key={movie.id}
                      />
                    )
                  )}
              </div>

              <div className="app-searchmovies">
                {movies
                  .slice(0, index)
                  .map(
                    (movie) =>
                      movie.poster_path && (
                        <SearchMovies movie={movie} key={movie.id} />
                      )
                  )}
              </div>
            </div>
          }
        />
        <Route
          path="/overdetail/:id"
          element={<Overdetail language={language} />}
        />
      </Routes>
    </>
  );
}

export default App;
