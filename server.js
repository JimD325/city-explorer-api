'use strict';
// we need to bring in our requires, which are similar to imports, bringing our libraries into app. EVERY dependency which has been installed must also be imported.
// this library lets us access our .env file
require('dotenv').config();

// express is a server library, save as a varible because you want to do things with the creation of the express library, allows you to call methods and properties using express variable. 
const express = require('express');

// initalizes the express library, instantiates a new instance of an Express Server. The way in which you order your code is important, you can switch out dependencies, but the way you put them together must be in the same order for the screen reader ie, you cannot call express before you require it. 
const app = express();

// library that determines who is allowed to speak to our server, same as express.
const cors = require('cors');


// this settting says that everyone is allowed to speak to our server. cors is our "middleware". Hey app, use the cors library, creates an instance of cors and telling our app to use it as its bodyguard. 
app.use(cors());

// we are getting the port variable from the .env file. A port is a virtual socket you use to plug in and connect to other devices. We used this before in lab 6 to store our keys for API data, we are doing that here as well, so now PORT is equal to our env file. PORT variable is NOT bannanas, when you deploy to Heroku, Heroku looks for a varaible named PORT to insert its server PORT into. 
const PORT = process.env.PORT || 3002;

// this is a route or an endpoint. if you turn the server on and go to http://localhost:3001/ (or whatever port you specified in your .env), you will see 'hello from the home route'. app.get is saying "Read me some data."
// the '/' is our "home" or "testing" path. request response are also NOT bannanas. you must use req, res, request, or response. 

app.get('/', (request, response) => {
  response.send('hello from the home route');
});
// response.send sents it to our front end. 
// create a route for handling weather data. can use req or res, or request or response, but thats it. 
app.get('/weather', (req, res) => {
  const city = req.query.city_name;
  console.log('location of weather requested: ', city);
  const forecastResult = new Forecast(city);
  console.log("forcast result is:", forecastResult)
  res.send(forecastResult);
})

// this class is used to fulfill requests for city locations
class Forecast {
  // static means that this variable is use by the class to create the Forecast object and is NOT used by the Forecast object. 
  static weather = require('./data/weather.json')

  constructor(city) {
    this.city = Forecast.weather.find(locationObj => locationObj.city_name.toLowerCase() === city.toLowerCase());
    this.forecastArray = this.city.data.map(locationObj => ({
      description: `Temperature ranges from ${locationObj.low_temp} degrees  to ${locationObj.max_temp} degrees.`, date: `${locationObj.datetime}`})
    );
    console.log(this.forecastArray);
  };
}
// .find is similar to filter, it returns the first item it finds that matches the conditional. 
// this turns the server on to the port that you specifed in your .env file
// listen method tells our express server which port to send data to. 
// Any time you change your server, you MUST restart the server. 
// listening on port 3001 is the message you see when you know its runnign.
// below is an annonymous function that tells us 
app.listen(PORT, () => console.log(`listening on ${PORT}`));