const API_KEY = "96e7bbdaaa30477ffd7b3bd013c61d49"; // ← tu clave
const LAT = -34.5333; // Villa Ballester
const LON = -58.5667;

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}`;

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];
  const hoy = dias[now.getDay()];
  document.querySelectorAll(".day").forEach((el) => {
    el.classList.remove("active");
    if (el.id === hoy) el.classList.add("active");
  });
}

function updateWeather() {
  // Clima actual
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&lang=es&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const icon = data.weather[0].icon;
      document.getElementById("temp").textContent = `${temp}°C`;
      document.getElementById("iconToday").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    });

  // Pronóstico de mañana
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&lang=es&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const targetDate = tomorrow.toISOString().split("T")[0];

      const temps = data.list.filter(item => item.dt_txt.startsWith(targetDate));
      if (temps.length > 0) {
        const avgTemp = temps.reduce((sum, item) => sum + item.main.temp, 0) / temps.length;
        const icon = temps[0].weather[0].icon;
        document.getElementById("tempTomorrow").textContent = `${Math.round(avgTemp)}°C`;
        document.getElementById("iconTomorrow").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      }
    });
}

function updateNetworkSpeed() {
  const image = new Image();
  const startTime = performance.now();
  image.src = "https://www.google.com/images/phd/px.gif?" + startTime;
  image.onload = () => {
    const endTime = performance.now();
    const duration = (endTime - startTime) / 1000;
    const sizeBits = 8000;
    const speedMbps = (sizeBits / duration / 1024 / 1024).toFixed(2);
    document.getElementById("speed").textContent = `${speedMbps} Mbps`;
  };
}

setInterval(updateClock, 1000);
setInterval(updateNetworkSpeed, 10000);
setInterval(updateWeather, 600000); // cada 10 minutos

updateClock();
updateNetworkSpeed();
updateWeather();
