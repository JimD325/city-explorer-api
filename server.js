'use strict';

let cache = require('./cache.js');

require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const movieRequest = require('./movie.js');
const weatherRequest = require('./weather.js');
const error = require('./error.js');
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Home route Message');
});


const getWeather = (req,res)=> weatherRequest(req).then(val => res.status(200).send(val));

const getMovies = (req,res)=> movieRequest(req).then(val => res.status(200).send(val));



app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.use('*', error);


app.listen(PORT, () => console.log(`listening on ${PORT}`));
