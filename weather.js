
const request = require('request');

var weatherInfo = async (addressResults, callback) => {
  
    await request({
      //API Key has been reset ... generate and add your own Dark Sky API Key
        url: `https://api.darksky.net/forecast/d7401dba04ddcfb28e625a5486dfb18b/${addressResults.latitude},${addressResults.longitude}?units=auto`,
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
