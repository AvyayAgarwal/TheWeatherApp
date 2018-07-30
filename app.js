const yargs = require('yargs');
const express = require('express');
const bodyParser = require('body-parser');

const geocode = require('./geocode');
const weather = require('./weather');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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


var result = `\nTesting\n`;
// geocode.geocodeAddress(argv.address, (addressError, addressResults) => {
//   console.log(); //To provide initial spacing int he command line regardless of the output
//   if (addressError) {
//     console.log(`Address Error: ${addressError}`);
//     result = result + `Address Error: ${addressError}\n`;
//   } else {
//     weather.weatherInfo(addressResults, (weatherError, weatherResults) => {
//       if(weatherError) {
//         console.log(`Weather Error: ${weatherError}`);
//         result = result + `Weather Error: ${weatherError}\n`;
//       } else {
//         console.log(`The weather in ${addressResults.address} is currently ${weatherResults.weather}.`);
//         console.log(weatherResults.dayForecast);
//         result = result + `The weather in ${addressResults.address} is currently ${weatherResults.weather}. \n${weatherResults.dayForecast} \n`;

//         if(weatherResults.temperature !== weatherResults.realFeel) {
//           console.log(`It is ${weatherResults.temperature}° but it feels like ${weatherResults.realFeel}°.`);
//           result = result + `It is ${weatherResults.temperature}° but it feels like ${weatherResults.realFeel}°.\n`;
//         } else {
//           console.log(`The present temperature is ${weatherResults.temperature}°.`);
//           result = result + `The present temperature is ${weatherResults.temperature}°.\n`;
//         }

//         if(weatherResults.precipitation !== undefined) { //If there is a chance of some type of precipitation
//           console.log(`There is a ${Math.round(weatherResults.probability*100)}% chance of ${weatherResults.precipitation} and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`);
//           result = result + `There is a ${Math.round(weatherResults.probability*100)}% chance of ${weatherResults.precipitation} and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`;
//         } else { //If there is not precipitation
//           console.log(`There is a ${Math.round(weatherResults.probability*100)}% chance of precipitation and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`);
//           result = result + `There is a ${Math.round(weatherResults.probability*100)}% chance of precipitation and humidity is at ${Math.round(weatherResults.humidity*100)}%.\n`;
//         }

//         if(weatherResults.alert !== undefined) {
//           if(weatherResults.alert.title!== undefined) {
//             console.log(`There is a ${weatherResults.alert.title}.\n`);
//             result = result + `There is a ${weatherResults.alert.title}.\n`;
//           }
//         }
//       }
//     });
//   }
// });

app.get('/', (req, res) => {
  res.render('index', {
    weatherPrint: 'Testing',
  });
});

app.post('/show', (req,res) => {
  res.render('index', {
    weatherPrint: req.body.address
  });
});

app.listen(3000, () => {
  console.log("\n Server is up on port 3000\n");
});