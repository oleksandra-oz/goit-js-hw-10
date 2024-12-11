
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const btn = document.querySelector('button[type="button"]');
const input = document.querySelector('input#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() < options.defaultDate.getTime()) {
      btn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      btn.disabled = false;
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', startTimer);

let timerIsActive = false;

function startTimer(evt) {
  evt.preventDefault();
  btn.disabled = true;

  const intervalId = setInterval(() => {
    if (!userSelectedDate) {
      return;
    }
    timerIsActive = true;
    const time = userSelectedDate - Date.now();
    console.log(time);
  }, 1000);

  if (timerIsActive) {
    clearInterval(intervalId);
  }
}

import flatpickr from 'flatpickr';
import iziToast from 'izitoast';


let userSelectedDate = null;
let timerInterval = null;

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('#startBtn');
const timerFields = document.querySelectorAll('.timer .value');

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};


flatpickr(input, options);


function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}


startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;
  const interval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = userSelectedDate - currentTime;
    if (timeRemaining <= 0) {
      clearInterval(interval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Done!',
        message: 'The countdown is finished.',
      });
      startBtn.disabled = true;
      input.disabled = false;
    } else {
      const timeData = convertMs(timeRemaining);
      updateTimerDisplay(timeData);
    }
  }, 1000);
});