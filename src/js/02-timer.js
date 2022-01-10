import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const nowDate = Date.now();
const parent = document.querySelector('.timer');
const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#datetime-btn');
const daysEl = parent.querySelector('[data-days]');
const hoursEl = parent.querySelector('[data-hours]');
const minutesEl = parent.querySelector('[data-minutes]');
const secondsEl = parent.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    const userTime = selectedDates[0].getTime();
    if (userTime < Date.now()) {
      alert('Please choose a date in the future');
    }
    startBtn.disabled = true;
    selectedTime(userTime);
  },
};
flatpickr(selector, options);

function convertMs(delta) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(delta / day);
  // Remaining hours
  const hours = Math.floor((delta % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((delta % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((delta % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
let resultTime = convertMs(nowDate);
function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function selectedTime(userTime) {
  const timerId = setInterval(() => {
    const delta = userTime - nowDate;
    convertMs(delta);
    updateTimer(resultTime);
  }, 1000);
}
