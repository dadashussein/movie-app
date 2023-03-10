import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";


const Header = ({ setSearch, language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const updateSuggestions = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
      );
      const data = await response.json();
      const results = data.results.map((result) => result.title);
      setSuggestions(results);
    };
    updateSuggestions();
  }, [searchTerm, language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <span className="logo">
            You <span>Movie</span>
          </span>
        </Link>

        <div className="header-wrapper">
          <div className={`search-input ${searchTerm && "active"}`}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={language === "en-US" ? "Search" : "Ara"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
            </form>

            <div className="autocom-box">
              {suggestions.map((suggestion) => (
                <div className="suggestion-list" key={suggestion}>
                  <Link
                    to="/searchResults"
                    className="suggest-line"
                    onClick={() => setSearch(suggestion)}
                  >
                    {suggestion}
                  </Link>
                </div>
              ))}
            </div>
            <Link to="/searchResults">
              <button className="icon" type="submit" onClick={handleSubmit}>
                <i className="fa fa-search"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
