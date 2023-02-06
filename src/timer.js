// 'use strict';

class Timer {
  constructor(timerDeadline, numbers) {
    this.timerDeadline = timerDeadline;
    this.dateNow = moment();
    this.timerId = null;
    this.numbers = numbers;
    this.activation = false;
  }

  start() {
    if (this.timerDeadline === '') {
      alert('Пожалуйста введите дату');
      return;
    }

    if (moment(this.timerDeadline).diff(this.dateNow) <= 0) {
      alert('Дата прошла! Введите более позднюю дату!');
      return;
    }

    this.activation = true;
    this.countDown();
    this.timerId = setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    this.dateNow = moment();

    if (moment(this.timerDeadline).diff(this.dateNow) <= 0) {
      clearInterval(this.timerId);
      return;
    }

    const days = moment(this.timerDeadline).diff(this.dateNow, 'days');
    const hours = moment(this.timerDeadline).diff(this.dateNow, 'hours') % 24;
    const minutes = moment(this.timerDeadline).diff(this.dateNow, 'minutes') % 60;
    const seconds = moment(this.timerDeadline).diff(this.dateNow, 'seconds') % 60;

    this.numbers.textContent = `${days < 10 ? '0' + days : days}:${
      hours < 10 ? '0' + hours : hours
    }:${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  }

  clearInterval() {
    clearInterval(this.timerId);
  }
}

export { Timer };
