/**
 * 1) Создать массив arr = []
— Записать в него 7 любых многозначных чисел в виде строк
— Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)
2) Вывести в столбик все простые числа от 1 до 100 (сделать при помощи цикла)
— Рядом с каждым числом написать оба делителя данного числа
  Например: “Делители этого числа: 1 и n”
*/

console.log("====(1)====");
const arr = [];
const arr2 = ["5987", "3469", "4068", "3310", "7800", "2837", "8041"];

for (let i = 0; i < 7; i++) {
  arr.push(Math.round(Math.random() * 10000).toString());
}
console.log(arr);
arr.map((el) => {
  if (el.match(/^2(?:...)/g) || el.match(/^4(?:...)/g)) {
    console.log(el);
  }
});
console.log("===========");
console.log(arr2);
arr2.map((el) => {
  if (el.match(/^2(?:...)/g) || el.match(/^4(?:...)/g)) {
    console.log(el);
  }
});

console.log("====(2)====");

function isSimple(n) {
  if (n === 1 || n === 0) {
    return false;
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }
}

for (let i = 2; i < 100; i++) {
  if(isSimple(i)) {
    console.log(`${i}, Делители этого числа: 1 и ${i}`);
  }
}

