/**
 * Создать массив week и записать в него дни недели в виде строк

·        Вывести на экран все дни недели

·        Каждый из них с новой строчки

·        Выходные дни - курсивом

·        Текущий день - жирным шрифтом(использовать объект даты)
 */
"use strict";

const days = [
  "Воскресенье".italics(),
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота".italics(),
];
const date = new Date();
const dayId = date.getDay();

for (let i = 0; i < days.length; i++) {
  if (i === dayId) {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[
      i
    ].bold()}</span>`;
  } else {
    document.body.innerHTML += `<span style="font-size: 40px; display:flex">${days[i]}</span>`;
  }
}
