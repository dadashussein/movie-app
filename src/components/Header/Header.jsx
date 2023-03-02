import React from "react";
import { useState, useEffect } from "react";
import "./header.css";

const Header = ({ setSearch, language }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const updateSuggestions = async (searchTerm) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const data = await response.json();
    const results = data.results.map((result) => result.title);
    setSuggestions(results);
  };

  useEffect(() => {
    updateSuggestions(searchTerm);
  }, [searchTerm]);

  const eventHandle = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm("");
    setSearch(searchTerm);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-container">
        <span className="logo" onClick={refreshPage}>
          You <span>Movie</span>
        </span>
        <div className="header-wrapper">
          <div
            className={`${
              searchTerm.length > 0 ? "search-input active" : "search-input"
            }`}
          >
            <form onSubmit={handleSubmit}>
              <input
                onChange={eventHandle}
                value={searchTerm}
                type="text"
                placeholder={language === "en-US" ? "Search" : "Ara"}
                required
              />
            </form>
            <div className="autocom-box">
              {suggestions.map((suggestion) => (
                <div className="suggestion-list" onClick={handleSubmit}>
                  <li>{suggestion}</li>
                </div>
              ))}
            </div>
            <button className="icon" onClick={handleSubmit} type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
