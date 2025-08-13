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

async function updateWeather() {
  const API_KEY = '96e7bbdaaa30477ffd7b3bd013c61d49'; // Reemplazá con tu clave real
  const city = 'Villa Ballester,AR';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const condition = data.weather[0].description;
    const min = Math.round(data.main.temp_min);
    const max = Math.round(data.main.temp_max);
    const humidity = data.main.humidity;
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('temp').textContent = `${temp}°C`;
    document.getElementById('condition').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
    document.getElementById('minmax').textContent = `Min: ${min}° / Max: ${max}°`;
    document.getElementById('weather-icon').src = iconSrc;

    // Extra: sensación térmica y humedad (si tenés espacio en el HTML)
    const extra = `Sensación: ${feelsLike}° / Humedad: ${humidity}%`;
    const extraBlock = document.getElementById('weather-extra');
    if (extraBlock) {
      extraBlock.textContent = extra;
    }
  } catch (error) {
    console.error('Error al obtener el clima:', error);
  }
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
setInterval(updateWeather, 10 * 60 * 1000); // Actualiza clima cada 10 min
