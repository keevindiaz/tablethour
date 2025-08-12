const API_KEY = "96e7bbdaaa30477ffd7b3bd013c61d49";
const LAT = -34.6;
const LON = -58.55;

// ⏰ Reloj en tiempo real
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}`;

  // 🔴 Día actual en rojo
  const days = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const today = days[now.getDay()];
  document.querySelectorAll(".days span").forEach(span => {
    span.classList.toggle("active", span.textContent === today);
  });
}
setInterval(updateClock, 1000);
updateClock();

// 🌡️ Clima actual
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=es&appid=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const min = Math.round(data.main.temp_min);
    const max = Math.round(data.main.temp_max);
    const icon = data.weather[0].icon;
    const wind = Math.round(data.wind.speed * 3.6);

    document.getElementById("tempToday").textContent = `${temp}°C`;
    document.getElementById("minToday").textContent = `Mín: ${min}°C`;
    document.getElementById("maxToday").textContent = `Máx: ${max}°C`;
    document.getElementById("iconToday").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById("windSpeed").textContent = `Viento: ${wind} km/h`;
  });
