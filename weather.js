
const request = require('request');

var weatherInfo = (addressResults, callback) => {
  
    request({
        url: `https://api.darksky.net/forecast/2e283728b24813c92ccb34938ff0ed11/${addressResults.latitude},${addressResults.longitude}?units=auto`,
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
