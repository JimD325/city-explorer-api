'use strict';
const axios = require('axios');
const cache = require('./cache.js');

async function weatherRequest(req) {
  const { lat, lon } = req.query;
  const key = 'weather' + lat + lon
  if (cache[key] && (Date.now() - cache[key].timestamp < 43200)) {
    console.log('Cache hit!');
    return cache[key];
  }
  else {
    console.log('cache miss!');
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}&days=7`;
    try {
      const weatherResponse = await axios.get(url);
      const forecastResult = weatherResponse.data.data.map(val => new Forecast(val));
      cache[key] = req.query;
      cache[key].timestamp = Date.now();
      cache[key].data = forecastResult;
      return Promise.resolve(forecastResult);
    }
    catch (error) {
      return Promise.reject(error) = 'Summon the Dev Team';
    }
  }
}


// this class is used to fulfill requests for city locations
class Forecast {
  constructor(city) {
    this.description = city.weather.description
    this.datetime = city.datetime;


  };
}

module.exports = weatherRequest;