const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// App PORT set with production check
const PORT = process.env.PORT || 5000;

// Route includes
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Express Routes

const giphy_api_key = 'YOUR KEY HERE'; // Replace to make project work

app.get('/gifs' , (req, res) => {
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${giphy_api_key}`)
    .then((response) => {
        res.send(response.data)
    })
    .catch((error) => {
        console.log('GET /gifs failed:' , error);
        res.sendStatus(500);
    })
})

// Serve static files
app.use(express.static('build'));

// Routes
app.use('/api/favorite', favoriteRouter);
app.use('/api/category', categoryRouter);

// Listen
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
