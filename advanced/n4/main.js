/**
 * Создайте функцию, которая принимает 1 аргумент (название произвольное)
— Если в качестве аргумента передана не строка - функция оповещает об этом пользователя
— В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
— Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
 */
const stringTheGreatest = 
  "         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis officia, architecto possimus deserunt excepturi nobis modi assumenda! Et exercitationem consequuntur natus perferendis eos! Vitae voluptate ullam, similique in officiis voluptatum aperiam, cupiditate, placeat doloribus error repellat! Soluta vitae laboriosam delectus esse quaerat, culpa sit possimus eum incidunt provident, eos sequi!         ";
const stringTheSmallest = '               Lorem ipsum.                 ';
const stringTrimmer = (el) => {
  if (typeof el !== "string") {
    return new Error() + "! Выведи и введи нормально!";
  }
  console.log(`Входная строка:
  [${el}]`);
  if (el.trim().length > 30) {
    return el.trim().slice(0, 30) + "(...)";
  } else {
    return el.trim();
  }
};

console.log(`Ваша строка после обработки:
[${stringTrimmer(stringTheGreatest)}]`);
console.log(`Ваша строка после обработки:
[${stringTrimmer(stringTheSmallest)}]`);
