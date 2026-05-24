function updateWeather() {
  var url = "https://clima.kevin-diaz98.workers.dev/";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      var temp = data.current_condition[0].temp_C;
      var conditionEN = data.current_condition[0].weatherDesc[0].value;
      var code = data.current_condition[0].weatherCode;
      var min = data.weather[0].mintempC;
      var max = data.weather[0].maxtempC;

      // Traducciones básicas
      var traducciones = {
        "Sunny": "Soleado",
        "Clear": "Despejado",
        "Partly cloudy": "Parcialmente nublado",
        "Cloudy": "Nublado",
        "Overcast": "Muy nublado",
        "Light rain": "Lluvia ligera",
        "Patchy rain possible": "Posible lluvia",
        "Moderate rain": "Lluvia moderada",
        "Heavy rain": "Lluvia fuerte",
        "Thunderstorm": "Tormenta"
      };

      var conditionES = traducciones[conditionEN] || conditionEN;

      // Íconos locales según código
      var iconMap = {
        113: "icons/sun.png",
        116: "icons/partly.png",
        119: "icons/cloud.png",
        122: "icons/cloud.png",
        176: "icons/rain.png",
        296: "icons/rain.png",
        389: "icons/storm.png"
      };

      var iconSrc = iconMap[code] || "icons/cloud.png";

      document.getElementById("weather-icon").src = iconSrc;
      document.getElementById("temp").textContent = temp + "°C";
      document.getElementById("condition").textContent = conditionES;
      document.getElementById("minmax").textContent =
        "Min: " + min + "° / Max: " + max + "°";
    }
  };

  xhr.send();
}
