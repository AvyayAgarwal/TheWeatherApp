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

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});