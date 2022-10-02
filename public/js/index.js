console.log('Inside index.js');

// fetch('http://puzzle.mead.io/puzzle')
//   .then((res) => {
//     res.json().then((data) => {
//       console.log({ data });
//     });
//   })
//   .catch((err) => console.log({ err }));

const getWeatherDetails = (place) => {
  return fetch(`http://localhost:3000/weather?address=${place}`)
    .then((res) => {
      return res.json().then((data) => {
        if (data.error) return data.error;
        else {
          return data;
        }
      });
    })
    .catch((err) => console.log({ err }));
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const foreCastElement = document.querySelector('#forecast');
const locationElement = document.querySelector('#location');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchLocation = search.value;
  locationElement.textContent = 'loading...';
  const myData = await getWeatherDetails(searchLocation);
  if (!myData.error) {
    const { foreCast, location } = myData ?? {};
    foreCastElement.textContent = foreCast;
    locationElement.textContent = location;
  } else {
    foreCastElement.innerHTML = myData.error;
  }
  search.value = '';
});
