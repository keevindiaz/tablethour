/* ---------------- TEMPORIZADOR ---------------- */

let timerSeconds = 40 * 60;
let timerInterval = null;

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
  const s = (timerSeconds % 60).toString().padStart(2, "0");
  document.getElementById("timer-display").textContent = `${m}:${s}`;
}

document.getElementById("add5").onclick = () => {
  timerSeconds += 5 * 60;
  updateTimerDisplay();
};

document.getElementById("sub5").onclick = () => {
  timerSeconds = Math.max(0, timerSeconds - 5 * 60);
  updateTimerDisplay();
};

document.getElementById("reset").onclick = () => {
  timerSeconds = 40 * 60;
  updateTimerDisplay();
};

document.getElementById("start-stop").onclick = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById("start-stop").textContent = "Iniciar";
  } else {
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }, 1000);
    document.getElementById("start-stop").textContent = "Pausar";
  }
};

updateTimerDisplay();