/* 🕒 Actualiza el reloj cada segundo */
function updateClock() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('clock').textContent = hours + ":" + minutes;
}

/* 📅 Marca el día actual */
function highlightToday() {
  var today = new Date().getDay(); // 0 = Domingo
  var jsToCustomIndex = [6, 0, 1, 2, 3, 4, 5]; // Reordena para Lun–Dom
  var activeIndex = jsToCustomIndex[today];

  var daySpans = document.querySelectorAll('#days span');
  for (var i = 0; i < daySpans.length; i++) {
    daySpans[i].classList.toggle('active', i === activeIndex);
  }
}

/* 🌤️ Clima compatible con Android 4.4.4 */
function updateWeather() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://wttr.in/Villa+Ballester?format=j1", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      var temp = data.current_condition[0].temp_C;
      var condition = data.current_condition[0].weatherDesc[0].value;
      var min = data.weather[0].mintempC;
      var max = data.weather[0].maxtempC;

      document.getElementById("temp").textContent = temp + "°C";
      document.getElementById("condition").textContent = condition;
      document.getElementById("minmax").textContent =
        "Min: " + min + "° / Max: " + max + "°";

      // Ícono simple (wttr no da íconos)
      document.getElementById("weather-icon").src = "https://via.placeholder.com/120?text=☁️";
    }
  };

  xhr.send();
}

/* ▶️ Inicialización */
updateClock();
highlightToday();
updateWeather();

/* 🔁 Intervalos */
setInterval(updateClock, 1000);
setInterval(highlightToday, 6 * 60 * 60 * 1000);
setInterval(updateWeather, 10 * 60 * 1000);
