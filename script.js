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

setInterval(updateClock, 1000);
updateClock();
