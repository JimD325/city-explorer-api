'use strict';
const axios= require('axios');

async function weatherRequest(req) {
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&lat=${lat}&lon=${lon}&days=7`
  try {
    const weatherResponse = await axios.get(url);
    const forecastResult = weatherResponse.data.data.map(val => new Forecast(val));
    return Promise.resolve(forecastResult);
  }
  catch (error) {
    error.customeMessage = 'Summon the Dev Team';
  }
}


// this class is used to fulfill requests for city locations
class Forecast {
  constructor(city) {
    this.description=city.weather.description
    this.datetime=city.datetime;

  
  };
}

module.exports = weatherRequest;