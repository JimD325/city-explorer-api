'use strict';
const axios = require('axios');
const cache = require('./cache.js');

async function movieRequest(req) {
  const search = req.query.search.split(',')[0];
  const key = 'movie-' + search;
  if (cache[key] && (Date.now() - cache[key].timestamp < 43200)) {
    console.log('Cache hit!');
    return cache[key];
  }
  else {
    console.log('cache miss!');
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${search}`;
    try {
      const response = await axios.get(url);
      const movieResult = response.data.results.map(val => new Film(val));
      cache[key] = req.query;
      cache[key].timestamp = Date.now();
      cache[key].data = movieResult;
      return Promise.resolve(movieResult);
    }
    catch (error) {
      return Promise.reject(error) = 'Summon the Dev Team';
    }
  }
}


class Film {
  // static means that this variable is use by the class to create the Forecast object and is NOT used by the Forecast object. 
  constructor(movie) {
    this.description = movie.overview;
    this.date = movie.release_date;
    this.tagline = movie.tagline;
    this.title = movie.title;
    this.viewerRating = movie.vote_average;
    this.poster = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
  };
}

module.exports = movieRequest;