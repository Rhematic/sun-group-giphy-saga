import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [theGifs, setTheGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
    getFavorites();
    fetchGifs();
  }, []);

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

  const fetchGifs = () => {
    console.log(`running fetch gifs`);
    axios
      .get("/")
      .then((response) => {
        const apiResponse = response.data;
        console.log(`API response`, apiResponse.data);
        setTheGifs(apiResponse.data);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Giphy Search!</h1>
      </header>
      <input type="text" name="name" placeholder="search gifs" />
      {/* {theGifs.map((gif) => {
          return <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        })} */}
    </div>
  );
}
export default App;
