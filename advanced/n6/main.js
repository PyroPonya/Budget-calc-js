/**
 * (1)
Используйте функции alert, confirm, prompt для общения с пользователем.
Написать игровой бот.
"Загадывание случайного числа от 1 до 100"
Что должна делать программа:
— спрашивает пользователя: "Угадай число от 1 до 100".
— если пользовательское число больше, то бот выводит "Загаданное число меньше" и предлагает ввести новый вариант;
— если пользовательское число меньше, то бот выводит "Загаданное число больше" и предлагает ввести новый вариант;
— если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
— если пользователь нажимает "Отмена", то игра заканчивается и выводится сообщение "Игра окончена".
—  если пользовательское число равно загаданному, 
то игра заканчивается и выводит сообщение  "Поздравляю, Вы угадали!!!".
Программа должны быть выполнена с помощью рекурсии, без единого цикла.
Загаданное число должно храниться «в замыкании»
 * (2)
Дописать функционал игрового бота.
Кол-во попыток пользователя должно быть ограничено: 10
— если пользовательское число больше, то бот выводит "Загаданное число меньше, 
осталось попыток ..." и предлагает ввести новый вариант;
— если пользовательское число меньше, то бот выводит "Загаданное число больше, 
осталось попыток ..." и предлагает ввести новый вариант;
— если пользователь вводит правильное число, то бот выводит 
"Поздравляю, Вы угадали!!! Хотели бы сыграть еще?", 
при нажатии ОК игра перезапускается (снова 10 попыток и новое загаданное число)
— если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
— если пользователь нажимает "Отмена", то игра выводит прощальное сообщение и завершается.
— если закончились попытки то программа сообщает: "Попытки закончились, хотите сыграть еще?"
Программа должны быть выполнена с помощью рекурсии, без единого цикла.
Загаданное число и оставшиеся кол-во попыток должно храниться «в замыкании»
 */
"use strict";

//Проверка на <number>
const isNumber = (el) => {
  return !isNaN(parseFloat(el)) && isFinite(el);
};
//Случайное значение от min до max
const getRandomNumber = (min, max, el) => {
  const num = Math.floor(Math.random() * max + min);
  if (num === +el) {
    getRandomNumber(el);
  } else {
    return num;
  }
};
//Получение значения от пользователя
const getUserNumber = (str) => {
  let num = prompt(str);
  if (num === null) return null;
  else if (typeof num === "number") return num;
  else if (typeof num !== "number") return parseFloat(num);
};

function getStartGame(min, max) {
  let num = getRandomNumber(min, max);
  let attempts = 10;
  const askPlayer = function () {
    let playerGuess = getUserNumber(
      `Угадай число от ${min} до ${max}`,
      min,
      max
    );
    //Условия выхода из рекурсии
    if (playerGuess === null) {
      if (confirm("Уже все?")) {
        return alert("Игра окончена");
      }
    } else if (playerGuess === num) {
      alert(`${playerGuess}? Поздравляю, Вы угадали!!!
      Всего за ${10 - attempts} попыток ...`);
      if (confirm("Хотели бы сыграть еще?")) {
        num = getRandomNumber(min, max, num);
        attempts = 10;
        return startGame();
      } else {
        return alert("Игра окончена");
      }
    }
    //Условия запуска рекурсии
    if (!isNumber(playerGuess) || playerGuess > 100 || playerGuess < 1) {
      alert("Введи число! [от 1 до 100]");
      askPlayer(num);
    }
    if (playerGuess > 0 && playerGuess < 100) {
      if (num > playerGuess) {
        alert(
          `Загаданное число больше чем ${playerGuess}, осталось ${--attempts} попыток ...`
        );
        askPlayer(num);
      } else if (num < playerGuess) {
        alert(
          `Загаданное число меньше чем ${playerGuess}, осталось ${--attempts} попыток ...`
        );
        askPlayer(num);
      }
    }
  };
  return askPlayer;
}

//start
const startGame = getStartGame(1, 100);
startGame();
console.dir(startGame); //closure check
