"use strict";

import {Timer} from './timer.js';

const inputTitleText = document.getElementById(["title-date"]);
const mainTitle = document.querySelector("h1");
const buttonStart = document.getElementById("btn");
const buttonReset = document.getElementById(["btn-reset"]);
const inputDate = document.getElementById("date");
const numbers = document.querySelector(".numbers");

const firstScreen = document.querySelector(".input");
const secondScreen = document.querySelector(".output");

let timer;

function timerStart() {
  localStorage.setItem("date", inputDate.value);
  timer = new Timer(inputDate.value, numbers);
  timer.start();

  if (!timer.activation) {
    return;
  }

  titleChange();
  newScreen();
}

// class Timer {
//   constructor(timerDeadline, numbers, dateNow, timerId, activation) {
//     this.timerDeadline = timerDeadline;
//     this.dateNow = moment();
//     this.timerId = null;
//     this.numbers = numbers;
//     this.activation = false;
//   }

//   start() {
//     if (this.timerDeadline === '') {
//       alert('Пожалуйста введите дату');
//       return;
//     }

//     if (moment(this.timerDeadline).diff(this.dateNow) <= 0) {
//       alert('Дата прошла! Введите более позднюю дату!');
//       return;
//     }

//     this.activation = true;
//     this.countDown();
//     this.timerId = setInterval(this.countDown.bind(this), 1000);
//   }

//   countDown() {
//     this.dateNow = moment();

//     if (moment(this.timerDeadline).diff(this.dateNow) <= 0) {
//       clearInterval(this.timerId);
//       return;
//     }

//     let days = moment(this.timerDeadline).diff(this.dateNow, 'days');
//     let hours = moment(this.timerDeadline).diff(this.dateNow, 'hours') % 24;
//     let minutes = moment(this.timerDeadline).diff(this.dateNow, 'minutes') % 60;
//     let seconds = moment(this.timerDeadline).diff(this.dateNow, 'seconds') % 60;

//     this.numbers.textContent = `${days < 10 ? "0" + days : days}:${
//       hours < 10 ? "0" + hours : hours
//     }:${minutes < 10 ? "0" + minutes : minutes}:${
//       seconds < 10 ? "0" + seconds : seconds
//     }`;
//   }

//   clearInterval() {
//     clearInterval(this.timerId);
//   }
// }

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