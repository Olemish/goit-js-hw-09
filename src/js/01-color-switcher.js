const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]')
let timerId = null;
buttonStart.addEventListener('click', () => handleStartButton())
buttonStop.addEventListener('click', () => handleStopButton());

function handleStartButton() {
    timerId = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000) 
    buttonStart.disabled = true;
    buttonStop.disabled = false;
}

function handleStopButton() {
    clearInterval(timerId); 
    buttonStart.disabled = false;
    buttonStop.disabled = true; 
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
