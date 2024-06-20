let watchId;

export const startimer = (min = 0, sec = 0) => {
  const timer = document.querySelector('.stop-watch');
  let minutes = min;
  let seconds = sec;
  
  watchId = setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

export const stopTimer = () => clearInterval(watchId);