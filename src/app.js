const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { getGeoCodes, getWeatherDetails } = require('./utils');

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // for dynamic template, always in views folder or need to give directory to that folder like below
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//use, setup static directory to serve
app.use(express.static(publicDirectoryPath));

//endpoints
// this will not require siince we added above line
app.get('/', (req, res) => {
  //use render to send html template and use send for other res
  res.render('index', {
    title: 'My weather App',
    name: 'Adarsh Singh Tiwari',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About me', name: 'Adarsh Singh Tiwari' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Okay, tell me how can I help you?',
    name: 'Adarsh Singh Tiwari',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      status: '400',
      error: 'You must provide address term!',
    });
  }

  getGeoCodes(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error)
      return res.send({
        status: '400',
        error,
      });

    getWeatherDetails(
      latitude,
      longitude,
      (err, { temperature, feelslike, weather_descriptions } = {}) => {
        if (err) return res.send({ status: '400', error: err });

        res.send({
          status: '200',
          foreCast: `${weather_descriptions?.[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`,
          location: req.query.address,
          description: weather_descriptions?.[0],
        });
      }
    );
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    // query is used to get search string from url
    return res.send({
      error: 'You must provide search term!',
    });
  }

  res.send({
    products: [],
  });
});

// * for all wildcard match, which didn't matched above

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404!',
    name: 'Adarsh Singh Tiwari',
    errorText: 'Help article not found!',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404!',
    name: 'Adarsh Singh Tiwari',
    errorText: 'Page not found!',
  });
});

//server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
