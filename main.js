/**
 * - money,
 * - income,
 * - addExpenses,
 * - deposit,
 * - mission,
 * - period
 */

let money = 100;
let income = "freelance";
let addExpenses = "интернет, такси, коммуналка";
let deposit = false;
let mission = 700;
let period = 5;

console.log(`typeof money => ${typeof money}`);
console.log(`typeof money => ${typeof income}`);
console.log(`typeof money => ${typeof deposit}`);
console.log(`str.len => ${addExpenses.length}`);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLowerCase().split(""));

let budgetDay = Math.round((money / 30) * 10) / 10;

console.log(`budget per day => ${budgetDay}`);
