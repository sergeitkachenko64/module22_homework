let input = document.querySelector('input');
const btnReq = document.querySelector('.b-request');
const btnGeo = document.querySelector('.b-geolocation');
const request = document.querySelector('.request');
const resp = document.querySelector('.response');
const geolocation = document.querySelector('.geolocation');

btnReq.addEventListener('click', () => {
  request.textContent = ``;
  resp.textContent = `Ожидание ответа сервера...`;
  const myUrl = 'wss://echo-ws-service.herokuapp.com/';

  let websocket = new WebSocket(myUrl);
  request.textContent = `Ваше сообщение: ` + input.value;
  websocket.addEventListener('open', function (event) {
    websocket.send(input.value);
  });

  websocket.addEventListener('message', function (event) {
    resp.textContent = `Ответ сервера: ` + event.data;
  });
});

const error = () => {
  geolocation.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  geolocation.href = `https://yandex.ru/maps/?pt=${longitude},${latitude}&z=18&l=map`;
  geolocation.textContent = 'Ссылка на карту';
}

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    geolocation.textContent = 'Невозможно получить ваше местоположение';
  } else {
    geolocation.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});