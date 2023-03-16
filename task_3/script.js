const scr = document.querySelector('#screen');
const status = document.querySelector('#status');
const btn = document.querySelector('.j-btn-test');

const error = () => {
  status.textContent = 'Информация о местоположении недоступна.';
}

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  status.textContent = `Местоположение: широта ${latitude} °, долгота ${longitude} °`;
}

btn.addEventListener('click', () => {
  const width = screen.width;
  const height = screen.height;
  scr.textContent = `Ширина экрана устройства: ${width} px, высота: ${height} px`;

  if (!navigator.geolocation) {
    status.textContent = 'Информация о местоположении недоступна.';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});