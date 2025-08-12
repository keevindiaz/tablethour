function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

function highlightToday() {
  const today = new Date().getDay(); // 0 = Domingo
  const jsToCustomIndex = [6, 0, 1, 2, 3, 4, 5];
  const activeIndex = jsToCustomIndex[today];

  const daySpans = document.querySelectorAll('#days span');
  daySpans.forEach((span, index) => {
    span.classList.toggle('active', index === activeIndex);
  });
}

function updateWeather() {
  const temp = 23;
  const condition = 'Despejado';
  const min = 18;
  const max = 27;
  const iconSrc = 'https://openweathermap.org/img/wn/01d@2x.png';

  document.getElementById('temp').textContent = `${temp}°C`;
  document.getElementById('condition').textContent = condition;
  document.getElementById('minmax').textContent = `Min: ${min}° / Max: ${max}°`;
  document.getElementById('weather-icon').src = iconSrc;
}

function updateSpeed() {
  const download = (Math.random() * 100).toFixed(1);
  const upload = (Math.random() * 50).toFixed(1);
  document.getElementById('wind-block').textContent =
    `Velocidad: ${download} Mbps ↓ / ${upload} Mbps ↑`;
}

updateClock();
highlightToday();
updateWeather();
updateSpeed();

setInterval(updateClock, 10000);
setInterval(updateSpeed, 30000);
setInterval(highlightToday, 6 * 60 * 60 * 1000);
