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
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}`;

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [trendMovies, setTrendMovies] = useState([]);

  const getMovies = async (API_URL) => {
    const res = await fetch(API_URL);
    const data = await res.json();

    setMovies(data.results);
  };
  const getTrendMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setTrendMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInterval(() => {
      getTrendMovies();
    }, 1200);
  }, []);

  useEffect(() => {
    if (search) {
      getMovies(SEARCH_URL + "&query=" + search);
    }
  }, [search]);

  let myTrend = trendMovies.slice(0, 4);

  myTrend.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Header setSearch={setSearch} />
              {trendMovies.length === 0 ? (
                <Loading />
              ) : search ? null : (
                <TrendHeader />
              )}

              <div className="app-trendvideos">
                {myTrend.map((movie) =>
                  movie.poster_path && movie.length === 0 ? (
                    <Loading />
                  ) : search ? null : (
                    <TrendMovies movie={movie} key={movie.id} />
                  )
                )}
              </div>

              <div className="app-searchmovies">
                {movies.map(
                  (movie) =>
                    movie.poster_path && (
                      <SearchMovies movie={movie} key={movie.id} />
                    )
                )}
              </div>
            </div>
          }
        />
        <Route path="/overdetail/:id" element={<Overdetail />} />
      </Routes>
    </>
  );
}

export default App;
