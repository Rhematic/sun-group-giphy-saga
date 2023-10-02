import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const FavoritesView = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("3");
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
    getCategories();
  }, []);

  // axios request to our server to "GET" our favorites
  const getFavorites = () => {
    axios
      .get("/api/favorite")
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error getting favorites", error);
      });
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

  const updateCategory = (id) => {
    axios
      .put(`/api/favorite/${id}`, {
        category_id: selectedCategory,
      })
      .then((response) => {
        getFavorites();
      })
      .catch((error) => {
        console.error("Error updating favorite", error);
      });
  };

  const deleteFavorite = (id) => {
    axios
      .delete(`/api/favorite/${id}`)
      .then((response) => {
        getFavorites();
      })
      .catch((error) => {
        console.error("Error deleting favorite", error);
      });
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <iframe
              src={favorite.url}
              width="480"
              height="480"
              frameBorder="0"
            ></iframe>
            <br />
            <span>Category: {favorite.category_name}</span>

            <select onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button onClick={() => updateCategory(favorite.id)}>
              Set New Category
            </button>

            <button onClick={() => deleteFavorite(favorite.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesView;
