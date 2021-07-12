/**
 * Используя только файл скрипта  выполнить такие действия:
• Восстановить порядок книг.
• Заменить картинку заднего фона на другую из папки image
• Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
• Удалить рекламу со страницы
• Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
• в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
 */
'use strict';

const bookshelf = document.querySelector('.books');
const bookCollection = bookshelf.querySelectorAll('.book');
/**
 * function returns index of required book from bookCollection[]
 */
const getBookId = (book) => {
  for (let i = 0; i < bookCollection.length; i++) {
    if (parseInt(bookCollection[i].innerText.split('').slice(0, 7).pop()) === book) {
      return i;
    }
  }
};

//(1)Восстановить порядок книг
bookshelf.prepend(bookCollection[1]);
bookshelf.append(bookCollection[2]);
bookCollection[4].after(bookCollection[3]);

//(2)Заменить картинку заднего фона на другую из папки image
document.querySelector('body').style.backgroundImage =
  'url(./image/you-dont-know-js.jpg)';

//(3)Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const elBookThree = bookCollection[getBookId(3)].querySelector('h2>a');
const elIndex = elBookThree.innerText.split(' ').indexOf('Пропопипы');
let temp = elBookThree.innerText.split(' ');
temp.splice(elIndex, 1, 'Прототипы');
elBookThree.innerText = temp.join(' ');

//(4)Удалить рекламу со страницы
document.querySelector('div.adv').style.display = 'none';

//(5)Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
// console.log(bookCollection[getBookId(2)].querySelectorAll('ul>li'));
// console.log(bookCollection[getBookId(5)].querySelectorAll('ul>li'));

const fixPagesBookTwo = bookCollection[getBookId(2)].querySelectorAll('ul>li');
fixPagesBookTwo[1].after(fixPagesBookTwo[3]);
fixPagesBookTwo[3].after(fixPagesBookTwo[6]);
fixPagesBookTwo[6].after(fixPagesBookTwo[8]);
fixPagesBookTwo[9].after(fixPagesBookTwo[2]);

const fixPagesBookFive = bookCollection[getBookId(5)].querySelectorAll('ul>li');
fixPagesBookFive[1].after(fixPagesBookFive[9]);
fixPagesBookFive[9].after(fixPagesBookFive[3]);
fixPagesBookFive[3].after(fixPagesBookFive[4]);
fixPagesBookFive[8].before(fixPagesBookFive[5]);

//(6)в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const bookSelector = bookCollection[getBookId(6)].querySelector('ul');
const pages = bookSelector.querySelectorAll('li');
const newPage = document.createElement('li');
newPage.innerHTML = `<li>Глава 8: За пределами ES6</li>`;
pages[pages.length - 1].before(newPage);
