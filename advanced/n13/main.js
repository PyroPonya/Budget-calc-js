'use strict';
const container = document.querySelector('.container');
const btnOne = document.querySelector('.btn1');
const btnTwo = document.querySelector('.btn2');
const text = document.querySelector('.text');

const changeBackground = () => {
  //спасибо #StackOverflow за функцию рандома
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  container.style.backgroundColor = `#${randomColor}`;
  btnTwo.style.backgroundColor = `#${randomColor}`;
  btnOne.style.color = `#${randomColor}`;
  text.innerText = `#${randomColor}`;
};
changeBackground();

btnOne.addEventListener('click', changeBackground);
btnTwo.addEventListener('click', () => {
  setInterval(changeBackground, Math.random() * (1500 - 150) + 150);
});
