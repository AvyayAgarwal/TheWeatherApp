const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
  
geocode.geocodeAddress(argv.address, (addressError, addressResults) => {
  console.log(); //To provide initial spacing int he command line regardless of the output
  if (addressError) {
    console.log(`Address Error: ${addressError}`);
  } else {
    weather.weatherInfo(addressResults, (weatherError, weatherResults) => {
      if(weatherError) {
        console.log(`Weather Error: ${weatherError}`);
      } else {
        console.log(`The weather in ${addressResults.address} is currently ${weatherResults.weather}.`);
        console.log(weatherResults.dayForecast);

        if(weatherResults.temperature !== weatherResults.realFeel) {
          console.log(`It is ${weatherResults.temperature}° but it feels like ${weatherResults.realFeel}°.`);
        } else {
          console.log(`The present temperature is ${weatherResults.temperature}°.`);
        }

        if(weatherResults.precipitation !== undefined) { //If there is a chance of some type of precipitation
          console.log(`There is a ${Math.round(weatherResults.probability*100)}% chance of ${weatherResults.precipitation} and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`);
        } else { //If there is not precipitation
          console.log(`There is a ${Math.round(weatherResults.probability*100)}% chance of precipitation and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`);
        }

        if(weatherResults.alert !== undefined) {
          if(weatherResults.alert.title!== undefined) {
            console.log(`There is a ${weatherResults.alert.title}.\n`);
          }
        }
      }
    });
  }
});
