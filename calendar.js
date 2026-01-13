/* ---------------- CALENDARIO ---------------- */

function generateCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const jsToCustomIndex = [6, 0, 1, 2, 3, 4, 5];
  const startIndex = jsToCustomIndex[firstDay];

  document.getElementById("calendar-title").textContent =
    now.toLocaleString("es-ES", { month: "long", year: "numeric" });

  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  for (let i = 0; i < startIndex; i++) {
    grid.innerHTML += "<div></div>";
  }

  for (let d = 1; d <= daysInMonth; d++) {
    grid.innerHTML += `<div>${d}</div>`;
  }
}