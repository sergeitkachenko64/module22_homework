const coord = document.querySelector('#coord');
const timezone = document.querySelector('#timezone');
const dtime = document.querySelector('#date_time_txt');
const btn = document.querySelector('.j-btn-test');

const error = () => {
  coord.textContent = 'Информация о местоположении недоступна.';
}

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  coord.textContent = `Местоположение: широта ${latitude} °, долгота ${longitude} °`;
  request(latitude, longitude);
}

btn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    coord.textContent = 'Информация о местоположении недоступна.';
  } else {
    coord.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
})

function request(a, b) {
  let link = "https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=" + a + "&long=" + b;

  fetch(link)
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      timezone.textContent = 'Временная зона: ' + data.timezone;
      date_time_txt.textContent = 'Местные дата и время: ' + data.date_time_txt;
    })

    .catch(() => {
      timezone.textContent = 'Временная зона: Ошибка!';
      date_time_txt.textContent = 'Местные дата и время: Ошибка!';
    })
}
