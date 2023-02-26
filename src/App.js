import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchMovies from "./components/SearchMovies/SearchMovies";
import TrendMovies from "./components/TrendMovies/TrendMovies";
import TrendHeader from "./components/TrendHeader/TrendHeader";
import Loading from "./components/Loading";
import Overdetail from "./components/Overdetail/Overdetail";

function App() {
  // states
  const [language, setLanguage] = useState("en-US");
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [trendMovies, setTrendMovies] = useState([]);
  const [index, setIndex] = useState(0);

  // api urls
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`;

  // fetch functions
  const getMovies = async (API_URL) => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMovies(data.results);
  };
  const getTrendMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data = await response.json();
      setTrendMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrendMovies();
  }, [language]);

  useEffect(() => {
    if (search) {
      getMovies(SEARCH_URL + "&query=" + search);
    }
  }, [search, language]);

  // ...other code

  let myTrend = trendMovies.slice(0, 10);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

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

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <form className="lang-switcher">
                <select value={language} onChange={handleLanguageChange}>
                  <option value="en-US">EN</option>
                  <option value="tr-TR">TR</option>
                </select>
              </form>

              <Header setSearch={setSearch} language={language} />
              {trendMovies.length === 0 ? (
                <Loading />
              ) : search ? null : (
                <TrendHeader language={language} />
              )}

              <div className="app-trendvideos">
                {myTrend
                  .slice(0, index)
                  .map((movie) =>
                    movie.poster_path && movie.length === 0 ? (
                      <Loading />
                    ) : search ? null : (
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
