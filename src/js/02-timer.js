// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const buttonStart = document.querySelector('button[data-start]')
buttonStart.disabled = true;

let counter = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (Date.parse(selectedDates)<Date.parse(new Date())) {
          Notify.failure('Please choose a date in the future');
      } 
      else {
       counter = Date.parse(selectedDates[0]) - Date.parse(new Date())
       buttonStart.disabled = false;}
  },
};


buttonStart.addEventListener('click', () => handleButtonStart(counter))

function handleButtonStart() {
    
    const timer = setInterval(() => {
        // console.log(counter=counter - 1000)
        const { days, hours, minutes, seconds } = convertMs(counter = counter - 1000)
        const daysStr = days.toString()
        const hoursStr = hours.toString()
        const minutesStr = minutes.toString()
        const secondsStr = seconds.toString()
      daysEl.textContent = daysStr.length > 1 ? daysStr : addLeadingZero(daysStr)
      hoursEl.textContent = hoursStr.length > 1 ? hoursStr : addLeadingZero(hoursStr)
      minutesEl.textContent = minutesStr.length > 1 ? minutesStr : addLeadingZero(minutesStr)
      secondsEl.textContent = secondsStr.length > 1 ? secondsStr : addLeadingZero(secondsStr)
    }, 1000);
}


flatpickr("#datetime-picker", options);

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
function addLeadingZero(value){
    return value.padStart(2, "0")
}