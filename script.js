/* 🕒 Actualiza el reloj cada segundo */
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

/* 📅 Marca el día actual */
function highlightToday() {
  const today = new Date().getDay(); // 0 = Domingo
  const jsToCustomIndex = [6, 0, 1, 2, 3, 4, 5]; // Reordena para Lun–Dom
  const activeIndex = jsToCustomIndex[today];

  const daySpans = document.querySelectorAll('#days span');
  daySpans.forEach((span, index) => {
    span.classList.toggle('active', index === activeIndex);
  });
}

/* 🌤️ Obtiene clima desde OpenWeather */
async function updateWeather() {
  const API_KEY = '96e7bbdaaa30477ffd7b3bd013c61d49';
  const city = 'Villa Ballester,AR';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    let condition = data.weather[0].description.toLowerCase();
    const min = Math.round(data.main.temp_min);
    const max = Math.round(data.main.temp_max);

    /* 🔄 Traducciones manuales por si OpenWeather falla */
    const traducciones = {
      "overcast clouds": "Nublado total",
      "broken clouds": "Nubes dispersas",
      "few clouds": "Pocas nubes",
      "scattered clouds": "Nubes dispersas",
      "clear sky": "Cielo despejado",
      "light rain": "Lluvia ligera",
      "moderate rain": "Lluvia moderada"
    };

    if (traducciones[condition]) {
      condition = traducciones[condition];
    }

    /* 📝 Formato final */
    const formattedCondition =
      condition.charAt(0).toUpperCase() + condition.slice(1);

    /* 🌤️ Ícono con fallback seguro */
    const iconCode = data.weather[0].icon;
    const icon = document.getElementById('weather-icon');

    icon.onerror = () => {
      icon.onerror = null;
      icon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    };

    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    /* 📌 Actualiza DOM */
    document.getElementById('temp').textContent = `${temp}°C`;
    document.getElementById('condition').textContent = formattedCondition;
    document.getElementById('minmax').textContent = `Min: ${min}° / Max: ${max}°`;

  } catch (error) {
    console.error('Error al obtener el clima:', error);
  }
}

/* ▶️ Inicialización */
updateClock();
highlightToday();
updateWeather();

/* 🔁 Intervalos */
setInterval(updateClock, 1000);                 // Reloj perfecto
setInterval(highlightToday, 6 * 60 * 60 * 1000); // Cada 6 horas
setInterval(updateWeather, 10 * 60 * 1000);      // Clima cada 10 min
