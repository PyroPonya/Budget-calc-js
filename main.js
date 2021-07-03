"use strict";
/**
 * - money,
 * - income,
 * - addExpenses,
 * - deposit,
 * - mission,
 * - period
 */

let money = +prompt("Ваш месячный доход?", "1000");
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую (пример: Квартплата, проездной, кредит)",
  "Квартплата, проездной, кредит"
)
  .toLowerCase()
  .split(",")
  .map((el) => el.trim());
//let deposit = prompt("Есть ли у вас депозит в банке?") === "да" ? true : false;
let deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов?(1)", "машина");
let expenses2 = prompt("Введите обязательную статью расходов?(2)", "собака");
let amount1 = +prompt("Во сколько это обойдется?(1)", "100");
let amount2 = +prompt("Во сколько это обойдется?(2)", "200");
let budgetMonth = money - amount1 - amount2;
let income = "freelance";

console.log(`money => ${money}`);
console.log(`addExpenses => ${addExpenses}`);
console.log(addExpenses);
console.log(`deposit => ${deposit}`);
console.log(`budgetMonth => ${budgetMonth}`);

let mission = 7000;
let period = Math.ceil(mission / budgetMonth);
let budgetDay = Math.round((budgetMonth / 30) * 10) / 10;

console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(`Цель будет достигнута через ${period} месяцев!`);
console.log(`budget per day => ${budgetDay}`);

if (budgetDay > 12) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay <= 12 && budgetDay > 6) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay <= 6 && budgetDay > 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else {
  console.log("Что то пошло не так" + new Error());
}
