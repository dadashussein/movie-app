import React, { useState, useEffect } from "react";
import "./header.css";

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    setSearchTerm("");
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
          <div className={`search-input ${searchTerm && "active"}`}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={language === "en-US" ? "Search" : "Ara"}
                value={searchTerm}
                onChange={handleChange}
                required
              />
            </form>
            <div className="autocom-box">
              {suggestions.map((suggestion) => (
                <div className="suggestion-list" key={suggestion}>
                  <li onClick={() => setSearch(suggestion)}>{suggestion}</li>
                </div>
              ))}
            </div>
            <button className="icon" onClick={handleSubmit}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;