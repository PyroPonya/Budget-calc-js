/**
 * 1) Выведите на страницу текущую дату и время в 2-х форматах: 
    a) 'Сегодня Вторник, 4 февраля 2020 года, 21 час 5 минут 33 секунды'  
    б) '04.02.2020 - 21:05:33' 
2) Для вывода в формате (а) напишите функцию, 
которая будет менять склонение слов в зависимости от числа, "час, часов, часа"
3) Для вывода в формате (б) напишите функцию, 
которая будет добавлять 0 перед значениями 
которые состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)
4) С помощью функции setInterval, реализуйте обновление даты и времени каждую секунду 
 */
'use strict';
document.body.style =
  'height:100vh; width:100vw; display:flex; justify-content:center; align-items:center; color:yellow; background-color:black;';

function renderTime() {
  const date = new Date();
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC+3',
  };
  const arr = ['час', 'часа', 'часов'];

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  //Склонение времени
  const timeSpeller = (h, m, s, arrTime) => {
    if (h === 1 || h === 21) {
      h = `${h} ${arrTime[0]} `;
    } else if (h === 2 || h === 3 || h === 4 || h === 22) {
      h = `${h} ${arrTime[1]} `;
    } else {
      h = `${h} ${arrTime[2]} `;
    }
    m = `${m} мин `;
    s = `${s} сек `;
    return h + m + s;
  };
  //Опциональный донулятор
  const timeWithZero = (h, m, s) => {
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    h = h < 10 ? '0' + h : h;
    return `${h}:${m}:${s}`;
  };
  let rendField;

  rendField = '</br>==============================================</br>';
  rendField += `(1) Сегодня ${days[date.getDay()]}, ${date.toLocaleString(
    'ru',
    options
  )}, ${timeSpeller(hour, minute, second, arr)}`;
  rendField += '</br>==============================================</br>';
  rendField += `(2) ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getDate()
  }.${date.getFullYear()} - ${timeWithZero(hour, minute, second)}`;
  rendField += '</br>==============================================</br>';
  document.body.innerHTML = rendField;
}
setInterval(renderTime, 1000);
