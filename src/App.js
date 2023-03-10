import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchMovies from "./components/SearchMovies/SearchMovies";
import TrendMovies from "./components/TrendMovies/TrendMovies";
import Overdetail from "./components/Overdetail/Overdetail";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendMovies,
  fetchSearchMovies,
} from "./stores/thunks/movieThunks";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const { trendMovies, status } = useSelector((state) => state.movies);
  const [language, setLanguage] = useState("en-US");
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTrendMovies({ language }));
  }, [dispatch, language]);

  useEffect(() => {
    if (search) {
      dispatch(fetchSearchMovies({ language, search }))
        .then((res) => setMovies(res.payload))
        .catch((err) => console.log(err));
    }
  }, [dispatch, search, language]);

  if (status === "loading") return <LoadingSpinner />;

  return (
    <div className="container">
      <form className="lang-switcher">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">EN</option>
          <option value="tr-TR">TR</option>
        </select>
      </form>
      <Header setSearch={setSearch} language={language} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-trendvideos">
              {trendMovies.slice(0, 8).map((movie) => (
                <TrendMovies movie={movie} language={language} key={movie.id} />
              ))}
            </div>
          }
        />
        <Route
          path="/searchResults"
          element={
            <div className="app-searchmovies ">
              {movies.map(
                (movie) =>
                  movie.poster_path && (
                    <SearchMovies movie={movie} key={movie.id} />
                  )
              )}
            </div>
          }
        />
        <Route
          path="/overdetail/:id"
          element={<Overdetail language={language} />}
        />
      </Routes>
    </div>
  );
}

export default App;
