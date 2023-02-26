import React from "react";
import { useState } from "react";
import "./header.css";

const Header = ({ setSearch, language }) => {
  const [query, setQuery] = useState("");
  const eventHandle = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(query);
    setQuery("");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="header-container">
      <span className="icon" onClick={refreshPage}>
        You <span>Movie</span>
      </span>
      <h1>{`${language === "en-US" ? "Movie search" : "Film arama"}`}</h1>

      <form onSubmit={handleSubmit}>
        <input
          onChange={eventHandle}
          value={query}
          type="text"
          placeholder={language === "en-US" ? "Search" : "Ara"}
          required
        />
      </form>
    </div>
  );
};

export default Header;
