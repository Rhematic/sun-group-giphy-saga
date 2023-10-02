
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();
  const theGifs = useSelector((store) => store.gifList);

  const [search, setSearch] = useState("panda");

  useEffect(() => {
    dispatch({ type: "FETCH_GIFS", payload: search });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    dispatch({ type: "FETCH_GIFS", payload: search });
  };

  const handleFavoriteClick = () => {

  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter a search term"
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="gif-container">
        {theGifs.map((gif) => (
          <div key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <br/>
            <button onClick={handleFavoriteClick} className="favorite-button">Favorite</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
