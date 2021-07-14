'use strict';
/**
 * - money,
 * - income,
 * - addExpenses,
 * - deposit,
 * - mission,
 * - period
 */
//===================Var_selectors========================
//Рассчитать
let startBtn = document.getElementById('start'),
  //Плюс доход
  incomeAddBtn = document.querySelector('button.income_add'),
  //Плюс затраты
  expensesAddBtn = document.querySelector('button.expenses_add'),
  //Депозит чекбокс
  depositCheckbox = document.querySelector('#deposit-check'),
  //Возможные доходы
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  //Поля вывода
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  //Оставшиеся поля
  salaryAmount = document.querySelector('input.salary-amount'),
  incomeTitle = document.querySelector('input.income-title'),
  // incomeAmount = document.querySelector('input.income-amount'),
  expensesNameInput = document.querySelector('input.expenses-title'),
  //expensesSizeInput = document.querySelector('input.expenses-amount'),
  expensesItems = document.getElementsByClassName('expenses-items'),
  additionalExpensesItem = document.querySelector('input.additional_expenses-item'),
  targetAmount = document.querySelector('input.target-amount'),
  periodSelect = document.querySelector('input.period-select'),
  incomeItems = document.getElementsByClassName('income-items'),
  periodAmount = document.querySelector('.period-amount');
let inputsCollection = document.getElementsByTagName('input');

//========================================================
//Проверка на <number>
const isNumber = (el) => {
  return !isNaN(parseFloat(el)) && isFinite(el);
};
//Получение значения от пользователя, преобразование в <number>
const getUserNumber = (str) => {
  let num = prompt(str);
  // if (num === null) {
  //   return null; //@TODO: temp loop-breaker
  // } else
  if (isNumber(num)) {
    return +num;
  }
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 7000,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('change', () => {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelectorAll('input').forEach((el) => (el.value = ''));
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    if (expensesItems.length === 3) {
      expensesAddBtn.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelectorAll('input').forEach((el) => (el.value = ''));
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    if (incomeItems.length === 3) {
      incomeAddBtn.style.display = 'none';
    }
    //@TODO: event handler
    // blockInputLetters();
    // blockInputNumbers();
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      appData.income[itemIncome] = +cashIncome;
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItems.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function () {
    let sum = 0;
    for (let val in appData.expenses) {
      sum += +appData.expenses[val];
    }
    appData.expensesMonth = +sum;
  },
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget: () => {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.round((appData.budgetMonth / 30) * 10) / 10;
  },
  //Подсчитывает за какой период будет достигнута цель
  getTargetMonth: () => {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  //Получение статуса месячного дохода
  getStatusIncome: () => {
    if (appData.budgetMonth > 12) {
      return console.log('У вас высокий уровень дохода');
    } else if (appData.budgetMonth <= 12 && appData.budgetMonth > 6) {
      return console.log('У вас средний уровень дохода');
    } else if (appData.budgetMonth <= 6 && appData.budgetMonth > 0) {
      return console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return console.log('Что-то пошло не так ' + new Error());
    }
  },
  //Получение дохода с депозита
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (isNumber(appData.percentDeposit) || appData.percentDeposit.trim() === '');
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 1000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

startBtn.addEventListener('click', appData.start);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('change', (e) => {
  periodAmount.textContent = e.target.value;
});
//Salary amount required
startBtn.addEventListener('mouseenter', () => {
  if (salaryAmount.value === '') {
    startBtn.disabled = true;
    salaryAmount.addEventListener('input', () => {
      if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
        startBtn.disabled = false;
      }
    });
  } else {
    startBtn.disabled = false;
  }
});
//non RU input block
for (let el of inputsCollection) {
  if (
    el.getAttribute('placeholder') === 'Наименование' &&
    el.parentNode.parentNode.getAttribute('hasListenerLetters') !== 'true'
  ) {
    el.parentNode.parentNode.setAttribute('hasListenerLetters', 'true');
    el.parentNode.parentNode.addEventListener('keypress', (e) => {
      if (
        !e.key.match(/[а-яА-Я.\,\s]/g) &&
        e.target.getAttribute('placeholder') === 'Наименование'
      ) {
        e.preventDefault();
      }
    });
  }
}
//non NUMeric input block
for (let el of inputsCollection) {
  if (
    el.getAttribute('placeholder') === 'Сумма' &&
    el.parentNode.parentNode.getAttribute('hasListenerNumbers') !== 'true'
  ) {
    el.parentNode.parentNode.setAttribute('hasListenerNumbers', 'true');
    el.parentNode.parentNode.addEventListener('keypress', (e) => {
      if (!e.key.match(/[0-9]/g) && e.target.getAttribute('placeholder') === 'Сумма') {
        e.preventDefault();
      }
    });
  }
}

// console.log(`Ваши расходы на : ${Object.keys(appData.expenses)}
// в месяц составляют : ${appData.expensesMonth} рублей/долларов/гривен/юани`);
// console.log(
//   `При таких темпах вы достигнете вашей цели в :
// ${appData.mission} рублей/долларов/гривен/юани
// через ${appData.getTargetMonth(appData.mission, appData.budgetMonth)}`
// );
// appData.getStatusIncome();
// console.log(appData); //obj check

// //========================================================
// const appLogger = () => {
//   console.log('Наша программа включает в себя данные: ');
//   for (let el in appData) {
//     console.log(el + ' : ' + appData[el]);
//   }
// };
// appLogger();

// //========================================================
// const addExpensesLogger = () => {
//   let tempArr = [];
//   for (let el of appData.addExpenses) {
//     tempArr.push(el.charAt(0).toUpperCase() + el.substr(1));
//   }
//   return tempArr.join(', ');
// };
// console.log(addExpensesLogger());
