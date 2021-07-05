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
  return !isNaN(parseFloat(el)) && isFinite(el) && el.trim() !== "";
};

//Получение дохода <number>
const start = () => {
  do {
    money = prompt("Введите ваш месячный доход:");
  } while (!isNumber(money));
};
start();

let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую (пример: Квартплата, проездной, кредит)",
  "Квартплата, проездной, кредит"
)
  .toLowerCase()
  .split(",")
  .map((el) => el.trim());

let deposit = confirm("Есть ли у вас депозит в банке?");
let income = "freelance";
let mission = 7000;

//Функция возвращает сумму всех обязательных расходов за месяц
let expenses = [];
const getExpensesMonth = function () {
  let sum = 0;
  let amount;
  for (let i = 0; i < 4; i++) {
    expenses.push(prompt(`Введите обязательную статью расходов [${i} из 4]?`));
    while (!isNumber(amount)) {
      amount = prompt(`Во сколько '${expenses[i]}' обойдется?`);
    }
    sum += parseFloat(amount);
    amount = '';
  }
  return sum;
};
const expensesAmount = getExpensesMonth();

console.log(`getExpensesMonth=> ${expensesAmount}`);
//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = () => {
  return money - expensesAmount;
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
в месяц составляют : ${expensesAmount} рублей/долларов/гривен/юани`);
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
