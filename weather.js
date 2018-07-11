
const request = require('request');

var weatherInfo = (addressResults, callback) => {
    
    var lat = addressResults.latitude;
    var lng = addressResults.longitude;

    request({
        url: `https://api.darksky.net/forecast/2e283728b24813c92ccb34938ff0ed11/${lat},${lng}?units=auto`,
        json: true
      }, (error, response, body) => {
        if(response.statusCode === 200 && !error) {
          callback(undefined, {
              weather: body.currently.summary,
              temperature: body.currently.temperature,
              realFeel: body.currently.apparentTemperature,
              precification: body.currently.precipType,
              humidity: body.currently.humidity
          });
        } else {
          callback('Unable to get weather information')
        }
      });
};

module.exports.weatherInfo = weatherInfo;
