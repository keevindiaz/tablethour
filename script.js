const API_KEY = "96e7bbdaaa30477ffd7b3bd013c61d49"; // Reemplazá con tu clave real
const LAT = -34.6; // Buenos Aires
const LON = -58.55;

// 🔵 Clima actual
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=es&appid=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const min = Math.round(data.main.temp_min);
    const max = Math.round(data.main.temp_max);
    const icon = data.weather[0].icon;

    document.getElementById("tempToday").textContent = `Actual: ${temp}°C`;
    document.getElementById("minToday").textContent = `Mín: ${min}°C`;
    document.getElementById("maxToday").textContent = `Máx: ${max}°C`;
    document.getElementById("iconToday").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  });

// 🟠 Pronóstico de mañana
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=es&appid=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayStr = tomorrow.toISOString().split("T")[0];

    const tomorrowData = data.list.filter(item => item.dt_txt.startsWith(dayStr));

    const temps = tomorrowData.map(item => item.main.temp);
    const minTemps = tomorrowData.map(item => item.main.temp_min);
    const maxTemps = tomorrowData.map(item => item.main.temp_max);

    const avg = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
    const min = Math.round(Math.min(...minTemps));
    const max = Math.round(Math.max(...maxTemps));
    const icon = tomorrowData[4]?.weather[0].icon || "01d"; // Icono del mediodía aprox

    document.getElementById("tempTomorrow").textContent = `Prom: ${avg}°C`;
    document.getElementById("minTomorrow").textContent = `Mín: ${min}°C`;
    document.getElementById("maxTomorrow").textContent = `Máx: ${max}°C`;
    document.getElementById("iconTomorrow").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  });
