import '../css/common.css';

const refs = {
  start: document.querySelector('.start'),
  stop: document.querySelector('.stop'),
};
//1.Повесить слушателя события на кнопки : start,stop
//2.При нажатии кнопки старт запустить
// console.log(refs.start);
refs.start.addEventListener('click', OnBtnStart);
refs.stop.addEventListener('click', OnBtnStop);
const randomColor = getRandomHexColor();
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function OnBtnStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = randomColor;
    // refs.start.classList.add();
  }, 1000);
}

function OnBtnStop() {
  clearInterval(timerId);
  document.body.style.backgroundColor = 'white';
}
