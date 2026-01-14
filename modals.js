/* ---------------- MODALES ---------------- */
console.log("modals.js cargado");
const timerModal = document.getElementById("timer-modal");
const calendarModal = document.getElementById("calendar-modal");

document.getElementById("open-timer").onclick = () => {
  timerModal.classList.add("show");
};

document.getElementById("open-calendar").onclick = () => {
  generateCalendar();
  calendarModal.classList.add("show");
};

document.querySelectorAll(".close-modal").forEach(btn => {
  btn.onclick = () => {
    timerModal.classList.remove("show");
    calendarModal.classList.remove("show");
  };
});

window.onclick = (e) => {
  if (e.target === timerModal) timerModal.classList.remove("show");
  if (e.target === calendarModal) calendarModal.classList.remove("show");
};