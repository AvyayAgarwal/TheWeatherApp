
const request = require('request');

var weatherInfo = async (addressResults, callback) => {
  
    await request({
      //API Key has been reset and declared as an environment variable
      url: `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${addressResults.latitude},${addressResults.longitude}?units=auto`,
      json: true
      }, (error, response, body) => {
        if(response.statusCode === 200 && !error) {
          callback(undefined, {
              weather: body.currently.summary,
              dayForecast: body.hourly.summary,
              temperature: body.currently.temperature,
              realFeel: body.currently.apparentTemperature,
              precipitation: body.currently.precipType,
              probability: body.currently.precipProbability,
              humidity: body.currently.humidity,
              alert: body.alerts
          });
        } else {
          callback('Unable to get weather information')
        }
      });
};

module.exports.weatherInfo = weatherInfo;
