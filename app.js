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
  if (addressError) {
    console.log(`Address Error: ${addressError}`);
  } else {
    console.log(JSON.stringify(addressResults, undefined, 2));

    weather.weatherInfo(addressResults, (weatherError, weatherResults) => {
      if(weatherError) {
        console.log(`Weather Error: ${weatherError}`);
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
  }
});
