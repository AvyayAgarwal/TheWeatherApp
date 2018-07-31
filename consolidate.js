const geocode = require('./geocode');
const weather = require('./weather');

var fetchResults = (address, callback) => {
    geocode.geocodeAddress(address, (addressError, addressResults) => {
    if (addressError) {
        callback(`Address Error: ${addressError}<br>`);
    } else {
        weather.weatherInfo(addressResults, (weatherError, weatherResults) => {
            var result = '';
            if(weatherError) {
                result = result + `Weather Error: ${weatherError}<br>`;
            } else {                
                result = result + `The weather in ${addressResults.address} is currently ${weatherResults.weather}.<br>`;

                if(weatherResults.temperature !== weatherResults.realFeel) {
                    result = result + `It is ${weatherResults.temperature}° but it feels like ${weatherResults.realFeel}°.<br>`;
                } else {
                    result = result + `The present temperature is ${weatherResults.temperature}°.<br>`;
                }

                result = result + '<br>' + `${weatherResults.dayForecast}<br>`;

                if(weatherResults.precipitation !== undefined) { //If there is a chance of some type of precipitation
                    result = result + `There is a ${Math.round(weatherResults.probability*100)}% chance of ${weatherResults.precipitation} and humidity is at ${Math.round(weatherResults.humidity*100)}%.<br>`;
                } else { //If there is not precipitation
                    result = result + `There is a ${Math.round(weatherResults.probability*100)}% chance of precipitation and humidity is at ${Math.round(weatherResults.humidity*100)}%.<br>`;
                }

                if(weatherResults.alert !== undefined) {
                    if(weatherResults.alert.title!== undefined) {
                        result = result + `There is a ${weatherResults.alert.title}.<br>`;
                    }
                }
            }
            callback(result);
        });
    }
    });
}

module.exports.fetchResults = fetchResults;