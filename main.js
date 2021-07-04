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
let income = "freelance";
let mission = 7000;

//Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () => {
  return amount1 + amount2;
};

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = () => {
  return money - getExpensesMonth();
};

const accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.round((accumulatedMonth / 30) * 10) / 10;

//Подсчитывает за какой период будет достигнута цель
const getTargetMonth = () => {
  return mission / accumulatedMonth;
};

console.log(`Ваши расходы на : ${addExpenses}
в месяц составляют : ${getExpensesMonth()} рублей/долларов/гривен/юани`);
console.log(`При таких темпах вы достигнете вашей цели в : 
${mission} рублей/долларов/гривен/юани
через ${getTargetMonth()} месяцев!`);
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
    return "Что то пошло не так" + new Error();
  }
};
console.log(getStatusIncome());
