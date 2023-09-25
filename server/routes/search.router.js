const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  const query = req.query.q;
  axios
    .get(
      `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${process.env.GIPHY_API_KEY}&limit=5`
    )
    .then((response) => {
      res.send(response.data.data);
    })
    .catch((error) => {
      console.error("Error fetching data from Giphy API", error);
      res.sendStatus(500);
    });
});

module.exports = router;
