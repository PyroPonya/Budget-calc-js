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

//(1)Восстановить порядок книг
const divSwapper = () => {
  let booksColl = document.querySelectorAll('.books>.book');
  for (let i = 0; i < booksColl.length; i++) {
    if (
      i > 0 &&
      parseInt(booksColl[i - 1].innerText.split('').slice(0, 7).pop()) >
        parseInt(booksColl[i].innerText.split('').slice(0, 7).pop())
    ) {
      booksColl[i - 1].before(booksColl[i]);
      divSwapper();
    }
  }
};
divSwapper();

//(2)Заменить картинку заднего фона на другую из папки image
document.querySelector('body').style.backgroundImage =
  'url(./image/you-dont-know-js.jpg)';
//(3)Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
const bookCollection = document.querySelectorAll('.books>.book');

for (let el of bookCollection) {
  if (parseInt(el.innerText.split('').slice(0, 7).pop()) === 3) {
    let elSelected = el.querySelector('h2>a');
    const idEl = elSelected.innerText.split(' ').indexOf('Пропопипы');
    let temp = elSelected.innerText.split(' ');
    temp.splice(idEl, 1, 'Прототипы');
    elSelected.innerText = temp.join(' ');
  }
}
//(4)Удалить рекламу со страницы
document.querySelector('div.adv').style.display = 'none';

//(5)Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
/**
 * PS - слооожнааа XD
 */

const getBookId = (book) => {
  for (let i = 0; i < bookCollection.length; i++) {
    if (parseInt(bookCollection[i].innerText.split('').slice(0, 7).pop()) === book) {
      // console.log(
      //   `Your book no.${book} has arrived! with index:${i} from bookCollection`
      // );
      //console.log(bookCollection[i]);
      return i;
    }
  }
};
const pageFixer = (bookNo) => {
  const currentBook = Array.from(
    bookCollection[getBookId(bookNo)].querySelectorAll('ul>li')
  );
  for (let i = 0; i < currentBook.length; i++) {
    if (currentBook[i].innerText.split('').splice(0, 8).join('') === 'Введение') {
      currentBook[i].classList.add(`intro_A_${bookNo}`);
    } else if (
      currentBook[i].innerText.split('').splice(0, 11).join('') === 'Предисловие'
    ) {
      currentBook[i].classList.add(`intro_B_${bookNo}`);
    } else if (
      parseInt(currentBook[i].innerText.split('')[6]) > 0 &&
      !isNaN(parseInt(currentBook[i].innerText.split('')[6]))
    ) {
      currentBook[i].classList.add(
        `el_${currentBook[i].innerText.split('')[6]}_${bookNo}`
      );
    } else if (
      currentBook[i].innerText.split('').splice(0, 10).join('') === 'Приложение'
    ) {
      currentBook[i].classList.add(
        `Outro_${currentBook[i].innerText.split('').splice(11, 1).join('')}_${bookNo}`
      );
    }
  }
  pageFilter();
  function pageFilter() {
    for (let j = 0; j < 10; j++) {
      for (let i = 0; i < currentBook.length; i++) {
        if (currentBook[i].classList.contains(`intro_A_${bookNo}`)) {
          bookCollection[getBookId(bookNo)].querySelector('ul').prepend(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`intro_B_${bookNo}`)) {
          document.querySelector(`.intro_A_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_1_${bookNo}`)) {
          document.querySelector(`.intro_B_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_2_${bookNo}`)) {
          document.querySelector(`.el_1_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_3_${bookNo}`)) {
          document.querySelector(`.el_2_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_4_${bookNo}`)) {
          document.querySelector(`.el_3_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_5_${bookNo}`)) {
          document.querySelector(`.el_4_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_6_${bookNo}`)) {
          document.querySelector(`.el_5_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_7_${bookNo}`)) {
          document.querySelector(`.el_6_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`el_8_${bookNo}`)) {
          document.querySelector(`.el_7_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`Outro_A_${bookNo}`)) {
          bookCollection[getBookId(bookNo)].querySelector('ul').append(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`Outro_B_${bookNo}`)) {
          document.querySelector(`.Outro_A_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`Outro_C_${bookNo}`)) {
          document.querySelector(`.Outro_B_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        } else if (currentBook[i].classList.contains(`Outro_D_${bookNo}`)) {
          document.querySelector(`.Outro_C_${bookNo}`).after(currentBook[i]);
          console.log(`${currentBook[i].classList.value} successfully placed!`);
        }
      }
    }
  }
  console.log(currentBook);
};
pageFixer(2);
pageFixer(5);

// var swapArrayElements = function (arr, x, y) {
//   if (arr.length === 1) {
//     return arr;
//   }
//   arr.splice(y, 1, arr.splice(x, 1, arr[y])[0]);
//   return arr;
// };
// // const fixPages = (bookNum) => {
//   let sortObj = {};
//   const currentBookId = getBookId(bookNum);
//   const currentBook = bookCollection[currentBookId].querySelectorAll('ul>li');
//   for (let i = 0; i < currentBook.length; i++) {
//     let num = currentBook[i].innerText.split('')[6];
//     if (currentBook[i].innerText.split('').splice(0, 10).join('') === 'Приложение') {
//       bookCollection[currentBookId].querySelector('ul').append(currentBook[i]);
//     } else if (
//       (currentBook[i].innerText.split('').splice(0, 10).join('') !== 'Приложение' &&
//         isNaN(parseInt(num))) ||
//       parseInt(num) === 0
//     ) {
//       bookCollection[currentBookId].querySelector('ul').prepend(currentBook[i]);
//     } else if (!isNaN(parseInt(num)) && parseInt(num) !== 0) {
//       console.log(`val => ${num} :: index => ${i}`);
//       sortObj[num] = i - 1;
//     }
//   }
//   console.log(sortObj);
//   let objValue = Array.from(Object.keys(sortObj));
//   let objIndex = Array.from(Object.values(sortObj));
//   console.log(objValue.forEach((el) => parseInt(el) - 1));
//   console.log(`value: ${objValue}`);
//   console.log(`index: ${objIndex}`);
//   const testShuffle = () => {
//     for (let j = 1; j < objValue.length; j++) {
//       do {
//         const booksClosed = document.querySelectorAll('.books>.book');
//         console.log('inside');
//         console.log(booksClosed[currentBookId].querySelectorAll('ul>li'));
//         const a = booksClosed[currentBookId].querySelectorAll('ul>li')[+objIndex[j - 1]];
//         const b = booksClosed[currentBookId].querySelectorAll('ul>li')[+objIndex[j]];
//         console.log(a.innerText.slice(0, 8));
//         console.log(a);
//         console.log(b.innerText.slice(0, 8));
//         console.log(b);
//         a.before(b);
//         swapArrayElements(objValue, j, j - 1);
//       } while (+objValue[j - 1] < +objValue[j] && +objIndex[j - 1] > +objIndex[j]);
//     }
//     //testShuffle();
//   };
//   testShuffle();

//   return sortObj;
// };
// fixPages(2);
// fixPages(5);

//(6)в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const bookSelector = bookCollection[bookCollection.length - 1].querySelector('ul');
const pages = bookSelector.querySelectorAll('li');
const newPage = document.createElement('li');
newPage.innerHTML = `<li>Глава 8: За пределами ES6</li>`;
pages[pages.length - 1].before(newPage);
