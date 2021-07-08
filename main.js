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
  return !isNaN(parseFloat(el)) && isFinite(el);
};
//Получение значения от пользователя, преобразование в <number>
const getUserNumber = (str) => {
  let num = prompt(str);
  if (num === null) {
    return null; //@TODO: temp loop-breaker
  } else if (isNumber(num)) {
    return +num;
  }
};

//Получение дохода <number>
let money;
const start = () => {
  do {
    money = getUserNumber("Введите ваш месячный доход:");
    if (money === null) {
      return null;
    } //@TODO: temp loop-breaker
  } while (!isNumber(money));
};
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 7000,
  period: 3,
  asking: function () {
    if (confirm("Усть ли у вас дополнительный источник зароботка?")) {
      let itemIncome;
      let cashIncome;
      do {
        itemIncome = prompt(
          "Какой у вас вид дополнительного зароботка?",
          "Фриланс"
        );
      } while (isNumber(itemIncome) || itemIncome.trim() === "");

      do {
        cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?", 100);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    do {
      appData.addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую (пример: Квартплата, проездной, кредит)",
        "Квартплата, проездной, кредит"
      )
        .toLowerCase()
        .split(",")
        .map((el) => el.trim());
    } while (
      appData.addExpenses.filter((el) => {
        return isNumber(el);
      }).length > 0
    );

    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let expensesKey;
      let expensesValue;
      do {
        expensesKey = prompt(
          `Введите обязательную статью расходов [${i + 1} из 2]?`
        );
      } while (isNumber(expensesKey) || expensesKey.trim() === "");

      do {
        expensesValue = getUserNumber(`Во сколько '${expensesKey}' обойдется?`);
      } while (!isNumber(expensesValue));
      appData.expenses[expensesKey] = expensesValue;
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
    appData.getBudget();
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: () => {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.round((appData.budgetMonth / 30) * 10) / 10;
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (
        isNumber(appData.percentDeposit) ||
        appData.percentDeposit.trim() === ""
      );
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 1000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};
appData.asking();

console.log(`Ваши расходы на : ${Object.keys(appData.expenses)}
в месяц составляют : ${appData.expensesMonth} рублей/долларов/гривен/юани`);
console.log(
  `При таких темпах вы достигнете вашей цели в : 
${appData.mission} рублей/долларов/гривен/юани
через ${appData.getTargetMonth(appData.mission, appData.budgetMonth)}`
);
appData.getStatusIncome();
console.log(appData); //obj check

const appLogger = () => {
  console.log("Наша программа включает в себя данные: ");
  for (let el in appData) {
    console.log(el + " : " + appData[el]);
  }
};
appLogger();

//========================================================
const addExpensesLogger = () => {
  let tempArr = [];
  for (let el of appData.addExpenses) {
    tempArr.push(el.charAt(0).toUpperCase() + el.substr(1));
  }
  return tempArr.join(", ");
};
console.log(addExpensesLogger());
