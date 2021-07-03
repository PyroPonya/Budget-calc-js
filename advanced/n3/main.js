/**
1) Переменная lang может принимать 2 значения: 'ru' 'en'.
Написать условия при котором в зависимости от значения lang будут выводится дни недели на русском или английском языке. 
Решите задачу
  • через if, 
  • через switch-case 
  • через многомерный массив без ифов и switch.
2) У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”, 
если значение “Максим” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент”
Решить задачу с помощью нескольких тернарных операторов, без использования if или switch
 */

//1
let langGen = Math.random();
let currentLanguage = langGen > 0.5 ? "en" : "ru";
const dayRu = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const dayEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

console.log(`Current language => ${currentLanguage}`)
//(a)if
if (currentLanguage === "en") {
  console.log(dayEn);
} else {
  console.log(dayRu);
}
console.log("=============a");
//(b)switch-case
switch (currentLanguage) {
  case "en":
    console.log(dayEn);
    break;
  case "ru":
    console.log(dayRu);
    break;
  default:
    console.log(new Error());
    break;
}
console.log("==============b");
//(c)через многомерный массив без ифов и switch
let multiArr = [dayEn, dayRu];

currentLanguage === "en" ? console.log(multiArr[0]) : console.log(multiArr[1]);
console.log("==============c");

//2
//1_of_3
let nameGen = Math.random();
let namePerson = nameGen > 0.6 ? "Артем" : nameGen > 0.3 ? "Максим" : "Машина";

console.log(`Current nam => ${namePerson}`)
//Conditional_Operator
console.log(
  namePerson === "Артем"
    ? "Директор"
    : namePerson === "Максим"
    ? "Преподаватель"
    : "Студент"
);
