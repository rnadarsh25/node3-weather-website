const getWeatherDetails = (place) => {
  // http://localhost:3000 but remove this for depoyment
  return fetch(`/weather?address=${place}`)
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
