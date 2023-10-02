import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./Search.css";

const Search = () => {
  const dispatch = useDispatch();

  const theGifs = useSelector((store) => store.gifList);

  const [search, setSearch] = useState("panda");
  const [selectedCategory, setSelectedCategory] = useState("3");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_GIFS", payload: search });
    getCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    dispatch({ type: "FETCH_GIFS", payload: search });
  };

  const handleFavoriteClick = (gif) => {
    console.log("clicked gif is", gif);
    {
      axios
        .post("/api/favorite", {
          url: gif.embed_url,
          category_id: selectedCategory,
        })
        .then((response) => {
          // getFavorites();
        })
        .catch((error) => {
          console.error("Error adding new favorite", error);
        });
    }
  };

  const getCategories = () => {
    axios
      .get("/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error getting categories", error);
      });
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
            <br />
            <button
              onClick={() => handleFavoriteClick(gif)}
              className="favorite-button"
            >
              Favorite
            </button>

            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
