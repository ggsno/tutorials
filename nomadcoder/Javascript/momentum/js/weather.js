const API_KEY = 'f5fec730cf5f6845dbd5edf2bc554012';

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetch(url).then(response => response.json()).then(data => {
    console.log(data.name, data.weather[0].main);
  });
}

function onGeoError() {
  alert('We cannot find you. No weather for you.');
}


navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);