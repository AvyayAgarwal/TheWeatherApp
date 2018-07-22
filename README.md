# TheWeatherApp

A Node.js application that gives the current weather forecast of an inputted location.

It uses Google Maps and Dark Sky API to get location and weather information respectively.

Key features include temperature automatically being shown in Celsius or Fahrenheit depending on the units followed at that location. The application will also show national weather warnings if any have been issued.

## How to use:

Make sure you have node and npm installed. You can run the following commands to check which versions you have of each:
```
npm -v
node -v
```

1. Open Terminal or Command-Prompt and navigate to this directory containing this application

2. To install required node modules, run the following command: 
  ```
  npm install
  ```

3. Run
  ```
  node app.js {-a| -address} <Desired Location>
  ```
