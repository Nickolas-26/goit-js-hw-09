const refs = {
  start: document.querySelector('.start'),
  stop: document.querySelector('.stop'),
};

refs.start.addEventListener('click', OnBtnStart);
refs.stop.addEventListener('click', OnBtnStop);
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function OnBtnStart() {
  timerId = setInterval(() => {
    // console.log('h1')
    // refs.start.setAttribute('disabled', 'disabled');
    document.body.style.backgroundColor = getRandomHexColor();
    refs.start.disabled = true;
  }, 1000);
}

function OnBtnStop() {
  clearInterval(timerId);
  // refs.start.classList.add((disabled = 'false'));
  document.body.style.backgroundColor = 'white';
}
