const express = require('express');
const bodyParser = require('body-parser');

const consolidate = require('./consolidate.js');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.render('index', {
      weatherPrint: '',
    });
  });

app.post('/show', async (req,res) => {
  consolidate.fetchResults(req.body.address, (results) => {
    // console.log("Results log in fetchresults in app.post: ", results);
    res.render('index', {
      weatherPrint: results
    });
  });
});

app.listen(3000, () => {
  console.log("\nServer is up on port 3000\n");
});