"use strict";
/**
 * - money,
 * - income,
 * - addExpenses,
 * - deposit,
 * - mission,
 * - period
 */

let money;

//Проверка на <number>
const isNumber = (el) => {
  return !isNaN(parseFloat(el)) && isFinite(el) && el.trim() !== '';
};

//Получение дохода <number>
const start = () => {
  do{
    money = prompt("Введите ваш месячный доход:");
  }
  while(!isNumber(money));
};
start();

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
let amount1 = +prompt("Во сколько это обойдется?(1)", "100");
let expenses2 = prompt("Введите обязательную статью расходов?(2)", "собака");
let amount2 = +prompt("Во сколько это обойдется?(2)", "200");
let income = "freelance";
let mission = 7000;

//Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () => {
  return amount1 + amount2;
};
console.log(`getExpensesMonth=> ${getExpensesMonth()}`);
//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = () => {
  return money - getExpensesMonth();
};
console.log(`getAccumulatedMonth => ${getAccumulatedMonth()}`);

const accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.round((accumulatedMonth / 30) * 10) / 10;

//Подсчитывает за какой период будет достигнута цель
const getTargetMonth = (target, accumulatedPerMonth) => {
  if (target / accumulatedPerMonth < 0) {
    return "... Цель не будет достигнута!";
  } else {
    return `${Math.ceil(target / accumulatedPerMonth)} месяцев!`;
  }
};

console.log(`Ваши расходы на : ${addExpenses}
в месяц составляют : ${getExpensesMonth()} рублей/долларов/гривен/юани`);
console.log(
  `При таких темпах вы достигнете вашей цели в : 
${mission} рублей/долларов/гривен/юани
через ${getTargetMonth(mission, accumulatedMonth)}`
);
console.log(
  `Ваш бюджет на день составляет : ${budgetDay} рублей/долларов/гривен/юани`
);

const getStatusIncome = () => {
  if (budgetDay > 12) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay <= 12 && budgetDay > 6) {
    return "У вас средний уровень дохода";
  } else if (budgetDay <= 6 && budgetDay > 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else {
    return "Что-то пошло не так " + new Error();
  }
};
console.log(getStatusIncome());
