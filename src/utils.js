const request = require('postman-request');

const getGeoCodes = (place, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1Ijoicm5hc3QyNSIsImEiOiJja2hhbzd1YTEwbHZ0MzRsaGIyZ2dwYWx3In0.wQ6sR-UNkTfY4XFZlSh-jg&limit=1`;
  request({ url: geoUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback({ error: 'Something went wrong!!' });
    }
    if (body.error) {
      callback({ error: body.error });
    }
    if (!body.features.length) {
      callback({ error: 'Location not found!' });
    }
    const { center } = body.features[0];
    const longitude = center[0];
    const latitude = center[1];
    return callback(undefined, { longitude, latitude });
  });
};

const getWeatherDetails = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7cfa0e32804108ff7024c0e633d07627&query=${latitude},${longitude}`; //&units=f

  // weather stacks
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback({ error: 'Something went wrong!!' });
    }
    if (body.error) {
      callback({ error: body.error });
    }
    const { current } = body;
    callback(undefined, current);
  });
};

module.exports = { getGeoCodes, getWeatherDetails };
