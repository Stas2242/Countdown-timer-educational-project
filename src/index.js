// 'use strict';

import '../style.css';

import { Timer } from './timer.js';

const inputTitleText = document.getElementById(['title-date']);
const mainTitle = document.querySelector('h1');
const buttonStart = document.getElementById('btn');
const buttonReset = document.getElementById(['btn-reset']);
const inputDate = document.getElementById('date');
const numbers = document.querySelector('.numbers');

const firstScreen = document.querySelector('.input');
const secondScreen = document.querySelector('.output');

let timer;

function timerStart() {
  localStorage.setItem('date', inputDate.value);
  timer = new Timer(inputDate.value, numbers);
  timer.start();

  if (!timer.activation) {
    return;
  }

  titleChange();
  newScreen();
}

function titleChange() {
  const newTitle = `${inputTitleText.value} (${moment(inputDate.value).format(
    'DD.MM.YYYY'
  )})`;
  const localTitle = localStorage.setItem('title', newTitle);
  mainTitle.innerHTML = newTitle;
}

function newScreen() {
  firstScreen.classList.add('hide');
  secondScreen.classList.remove('hide');
  buttonStart.classList.add('hide');
  buttonReset.classList.remove('hide');
}

function timerReset() {
  firstScreen.classList.remove('hide');
  secondScreen.classList.add('hide');
  buttonStart.classList.remove('hide');
  buttonReset.classList.add('hide');

  mainTitle.innerHTML = 'Создать новый таймер обратного отсчета';
  inputTitleText.value = '';
  inputDate.value = '';
  timer.clearInterval();

  localStorage.removeItem('title');
  localStorage.removeItem('date');
}

const localStorageCheck = () => {
  const localDate = localStorage.getItem('date');
  const localTitle = localStorage.getItem('title');

  if (!localDate && !localTitle) {
    return;
  }

  timer = new Timer(localDate, numbers);
  timer.start();
  mainTitle.textContent = localTitle;

  newScreen();
};

localStorageCheck();

buttonStart.addEventListener('click', timerStart);
buttonReset.addEventListener('click', timerReset);
