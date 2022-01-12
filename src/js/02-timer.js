import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
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
      return Notiflix.Notify.warning('Please choose a date in the future');
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

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function selectedTime(userTime) {
  setInterval(() => {
    const delta = userTime - Date.now();
    let convertTime = convertMs(delta);
    updateTimer(convertTime);
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
