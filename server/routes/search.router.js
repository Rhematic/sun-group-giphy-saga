require("dotenv").config(); // env

const express = require('express');
const router = express.Router();
const axios = require('axios');

const giphy_api_key = process.env.GIPHY_API_KEY;

router.get('/', (req, res) => {
  let search = req.query.search;
  axios
    .get(`http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${giphy_api_key}&limit=5`)
    .then((response) => {
      res.send(response.data.data);
    })
    .catch((error) => {
      console.log("GET /gifs fail: ", error);
      res.sendStatus(500);
    });
});

module.exports = router;
