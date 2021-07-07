/**
 * Создать массив week и записать в него дни недели в виде строк

·        Вывести на экран все дни недели

·        Каждый из них с новой строчки

·        Выходные дни - курсивом

·        Текущий день - жирным шрифтом(использовать объект даты)
 */
"use strict";

const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const date = new Date();
const dayId = date.getDay();

for (let i = 0; i < days.length; i++) {
  if (i === dayId) {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
      i
    ].bold()}</span>`;
  } else if (i === 0 || i === 6) {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
      i
    ].italics()}</span>`;
  } else {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
  }
}
document.body.innerHTML += "==========================";

for (let i = 0; i < days.length; i++) {
  switch (i) {
    case dayId:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
        i
      ].bold()}</span>`;
      break;
    case 0:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
        i
      ].italics()}</span>`;
      break;
    case 1:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
      break;
    case 2:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
      break;
    case 3:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
      break;
    case 4:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
      break;
    case 5:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
      break;
    case 6:
      document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
        i
      ].italics()}</span>`;
      break;
  }
}
