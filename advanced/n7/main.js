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
let dayId = date.getDay();

for (let i = 0; i < days.length; i++) {
  if ((i === dayId && dayId === 0) || (i === dayId && dayId === 6)) {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
      i
    ]
      .bold()
      .italics()}</span>`;
  } else if (i === dayId) {
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
