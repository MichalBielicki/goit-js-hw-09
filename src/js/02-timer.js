import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const qs = selector => document.querySelector(selector);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const calendar = qs('#date-selector');
const btnStart = qs('button[data-start]');
const daysOutput = document.querySelector('.timer span[data-days]');
const hoursOutput = document.querySelector('.field span[data-hours]');
const minutesOutput = document.querySelector('.field span[data-minutes]');
const secondsOutput = document.querySelector('.field span[data-seconds');

let currentTime = new Date().getTime();
let choosenTime = 0;
let remainingTime = 0;
let currentValue = '';

btnStart.setAttribute('disabled', true);

const timeCheck = () => {
  if (currentTime > choosenTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btnStart.removeAttribute('disabled');
  }
};

const countdown = () => {
  let time = choosenTime - currentTime;
  remainingTime = setInterval(() => {
    time -= 1000;
    let remaining = convertMs(time);
    daysOutput.innerHTML = addLeadingZero(remaining.days);
    hoursOutput.innerHTML = addLeadingZero(remaining.hours);
    minutesOutput.innerHTML = addLeadingZero(remaining.minutes);
    secondsOutput.innerHTML = addLeadingZero(remaining.seconds);
  }, 1000);
  btnStart.setAttribute('disabled', true);
};

const addLeadingZero = value => {
  return (currentValue = value.toString().padStart(2, 0));
};
const opts = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();
    timeCheck();
  },
};
const fp = flatpickr(calendar, opts);
btnStart.addEventListener('click', countdown);
