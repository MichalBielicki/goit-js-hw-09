const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let backgroundColor;
const colors = () => {
  body.style.backgroundColor = getRandomHexColor();
};
const workColors = () => {
  stopBtn.disabled = false;
  backgroundColor = setInterval(colors, 1000);
  startBtn.disabled = true;
};
const notWorkColors = () => {
  stopBtn.disabled = true;
  clearInterval(backgroundColor);
  startBtn.disabled = false;
};
startBtn.addEventListener('click', workColors);
stopBtn.addEventListener('click', notWorkColors);
