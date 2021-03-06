'use strict';
//===================Var_selectors========================
//Рассчитать
const startBtn = document.getElementById('start'),
  //Плюс доход
  incomeAddBtn = document.querySelector('button.income_add'),
  //Плюс затраты
  expensesAddBtn = document.querySelector('button.expenses_add'),
  //Депозит чекбокс
  depositCheck = document.getElementById('deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
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
  expensesItems = document.getElementsByClassName('expenses-items'),
  additionalExpensesItem = document.querySelector('input.additional_expenses-item'),
  targetAmount = document.querySelector('input.target-amount'),
  periodSelect = document.querySelector('input.period-select'),
  incomeItems = document.getElementsByClassName('income-items'),
  periodAmount = document.querySelector('.period-amount');
const inputsCollection = document.getElementsByTagName('input');

//========================================================
//Проверка на <number>
const isNumber = (el) => {
  return !isNaN(parseFloat(el)) && isFinite(el);
};
//Получение значения от пользователя, преобразование в <number>
const getUserNumber = (str) => {
  const num = prompt(str);
  // if (num === null) {
  //   return null; //@TODO: temp loop-breaker
  // } else
  if (isNumber(num)) {
    return +num;
  }
};

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.mission = 0;
  }
  get infoObj() {
    return this;
  }
  set infoObj(el) {
    for (let key in this) {
      this[key] = el[key];
    }
  }
  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    [...incomeItems].forEach(count);
    [...expensesItems].forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  addExpIncBlock(el) {
    const addBlock = (item) => {
      const cloneItem = item[0].cloneNode(true);
      cloneItem.querySelectorAll('input').forEach((el) => (el.value = ''));
      item[0].parentNode.insertBefore(
        cloneItem,
        item[0].parentNode.querySelector('button')
      );
      if (item.length === 2) {
        item[0].parentNode.querySelector('button').style.display = 'none';
      }
    };
    addBlock(el);
  }
  getAddExpInc() {
    const addItems = (item) => {
      let addItem;
      if (item.parentNode) {
        addItem = item.value.split(',').map((el) => el.trim());
      } else {
        addItem = [...item].map((el) => el.value.trim());
      }
      addItem.forEach((el) => {
        if (el !== '') {
          if (item.parentNode) {
            this.addExpenses.push(el[0].toUpperCase() + el.slice(1).toLowerCase());
          } else {
            this.addIncome.push(el[0].toUpperCase() + el.slice(1).toLowerCase());
          }
        }
      });
    };
    addItems(additionalExpensesItem);
    addItems(additionalIncomeItems);
  }
  //Функция возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth() {
    let sum = 0;
    for (let val in this.expenses) {
      sum += +this.expenses[val];
    }
    this.expensesMonth = +sum;
  }
  //Функция возвращает Накопления за месяц (Доходы минус расходы)
  getBudget() {
    const monthDeposit =
      this.moneyDeposit *
      ((this.percentDeposit > 100 ? this.percentDeposit.slice(-2) : this.percentDeposit) /
        100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.round((this.budgetMonth / 30) * 10) / 10;
  }
  //Подсчитывает за какой период будет достигнута цель
  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  //Получение статуса месячного дохода (не используется)
  getStatusIncome() {
    if (this.budgetMonth > 12) {
      return console.log('У вас высокий уровень дохода');
    } else if (this.budgetMonth <= 12 && this.budgetMonth > 6) {
      return console.log('У вас средний уровень дохода');
    } else if (this.budgetMonth <= 6 && this.budgetMonth > 0) {
      return console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return console.log('Что-то пошло не так ' + new Error());
    }
  }
  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  //Получение дохода с депозита
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      //ограничение на числовое значение в методе getBudget, скрыто от глаз пользователя + блокировка не нумов в лисенерах
    } else {
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      this.deposit = false;
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  launchListeners() {
    //старт запускается только при заполненном поле :salaryAmount:
    startBtn.addEventListener('click', () => {
      if (!startBtn.classList.contains('resetFields') && salaryAmount.value !== '') {
        this.start();
      }
    });
    //ресет полей ввода
    startBtn.addEventListener('click', () => {
      const textInputs = document.querySelectorAll('input[type=text]');
      for (let el of textInputs) {
        //если :salaryAmount: не пустое, то при нажатии все инпуты блокируются
        if (salaryAmount.value !== '') {
          el.disabled = true;
        }
      }
      //если на кнопке есть класс, то его снимают, заменяется textContent, разблокируются инпуты
      if (startBtn.classList.contains('resetFields')) {
        startBtn.classList.remove('resetFields');
        for (let el of textInputs) {
          el.disabled = false;
          el.value = '';
          startBtn.textContent = 'Рассчитать';
        }
        depositCheck.checked = false;
        this.depositHandler();
        //Используем сеттер для записи свойств нового экземпляра объекта в старый
        this.infoObj = new AppData();
        //иначе, если указанного класса нет на кнопке и :salaryAmount: не пустое, то кнопке добавляется класс, меняется textContent, инпуты остаются заблокированными
      } else if (salaryAmount.value !== '') {
        startBtn.classList.add('resetFields');
        startBtn.textContent = 'Reset';
      } else {
        return new Error();
      }
    });
    incomeAddBtn.addEventListener('click', () => {
      this.addExpIncBlock([...incomeItems]);
    });
    expensesAddBtn.addEventListener('click', () => {
      this.addExpIncBlock([...expensesItems]);
    });
    periodSelect.addEventListener('change', (e) => {
      periodAmount.textContent = e.target.value;
    });
    depositBank.addEventListener('change', () => {
      if (depositBank.value === 'other') {
        depositPercent.style.display = 'inline-block';
      } else {
        depositPercent.style.display = 'none';
        depositPercent.value = '';
      }
    });
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    //Salary amount required
    startBtn.addEventListener('click', () => {
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
        (el.getAttribute('placeholder') === 'Сумма' &&
          el.parentNode.parentNode.getAttribute('hasListenerNumbers') !== 'true') ||
        (el.getAttribute('placeholder') === 'Процент' &&
          el.parentNode.parentNode.getAttribute('hasListenerNumbers') !== 'true')
      ) {
        el.parentNode.parentNode.setAttribute('hasListenerNumbers', 'true');
        el.parentNode.parentNode.addEventListener('keypress', (e) => {
          if (
            (!e.key.match(/[0-9]/g) &&
              e.target.getAttribute('placeholder') === 'Сумма') ||
            (!e.key.match(/[0-9]/g) && e.target.getAttribute('placeholder') === 'Процент')
          ) {
            e.preventDefault();
          }
        });
      }
    }
  }
}
const appData = new AppData();
appData.launchListeners();

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
