"use strict";
/**
 * - money,
 * - income,
 * - addExpenses,
 * - deposit,
 * - mission,
 * - period
 */

//Проверка на <number>
const isNumber = (el) => {
  return !isNaN(parseFloat(el)) && isFinite(el) && el !== "";
};
//Получение значения от пользователя, преобразование в <number>
const getUserNumber = (str) => {
  let num = prompt(str);
  if (num === null) return null;
  //@TODO: temp loop-breaker
  else if (typeof num === "number") return num;
  else if (typeof num !== "number") return parseFloat(num);
};

//Получение дохода <number>
let money;
const start = () => {
  do {
    money = getUserNumber("Введите ваш месячный доход:");
    if (money === null) return null; //@TODO: temp loop-breaker
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: ["freelance"],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 7000,
  period: 0,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let keyValueBind;
    appData.addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую (пример: Квартплата, проездной, кредит)",
      "Квартплата, проездной, кредит"
    )
      .toLowerCase()
      .split(",")
      .map((el) => el.trim());

    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 4; i++) {
      let expensesKey = prompt(
        `Введите обязательную статью расходов [${i + 1} из 4]?`
      );
      let expensesValue = "";
      while (!isNumber(expensesValue)) {
        expensesValue = getUserNumber(`Во сколько '${expensesKey}' обойдется?`);
      }
      keyValueBind = { [`${expensesKey}`]: expensesValue };
      appData.expenses = { ...appData.expenses, ...keyValueBind };
    }
    this.getExpensesMonth();
  },
  //Функция возвращает сумму всех обязательных расходов за месяц
  //*Можно переписать без внутренней переменной, но так выглядит надежнее
  getExpensesMonth: function () {
    let sum = 0;
    for (let val in appData.expenses) {
      sum += appData.expenses[val];
    }
    appData.expensesMonth = sum;
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getAccumulatedMonth: () => {
    return appData.budget - appData.expensesMonth;
  },
  //Подсчитывает за какой период будет достигнута цель
  getTargetMonth: () => {
    if (appData.mission / appData.budgetMonth < 0) {
      return "... Цель не будет достигнута!";
    } else {
      return `${Math.ceil(appData.mission / appData.budgetMonth)} месяцев!`;
    }
  },
  getStatusIncome: () => {
    if (appData.budgetMonth > 12) {
      return console.log("У вас высокий уровень дохода");
    } else if (appData.budgetMonth <= 12 && appData.budgetMonth > 6) {
      return console.log("У вас средний уровень дохода");
    } else if (appData.budgetMonth <= 6 && appData.budgetMonth > 0) {
      return console.log("К сожалению у вас уровень дохода ниже среднего");
    } else {
      return console.log("Что-то пошло не так " + new Error());
    }
  },
};
appData.asking();

appData.budgetMonth = appData.getAccumulatedMonth();
appData.budgetDay = Math.round((appData.budgetMonth / 30) * 10) / 10;

console.log(`Ваши расходы на : ${Object.keys(appData.expenses)}
в месяц составляют : ${appData.expensesMonth} рублей/долларов/гривен/юани`);
console.log(
  `При таких темпах вы достигнете вашей цели в : 
${appData.mission} рублей/долларов/гривен/юани
через ${appData.getTargetMonth(appData.mission, appData.budgetMonth)}`
);
appData.getStatusIncome(); // should i save it as appData.period?
console.log(appData); //obj check

const appLogger = () => {
  console.log("Наша программа включает в себя данные: ");
  for (let el in appData) {
    console.log(el + " : " + appData[el]);
  }
};
appLogger();
