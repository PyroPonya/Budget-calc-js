'use strict';

const date = new Date();
const timeWithZero = (h, m, s) => {
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  h = h < 10 ? '0' + h : h;
  return `${h}:${m}:${s}`;
};
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC+3',
};
let hour = date.getHours();
let minute = date.getMinutes();
let second = date.getSeconds();

const usernameField = document.querySelector('#username');
const registerUserBtn = document.querySelector('#registerUser');
const loginBtn = document.querySelector('#login');
const listUsers = document.querySelector('#list');
const clearStorage = document.querySelector('#clearMem');
//localStore workaround
const getLocalSave = () => {
  return JSON.parse(localStorage.getItem('userTableDataSave'));
};

let userBase = getLocalSave() || [];

const setLocalSave = () => {
  return localStorage.setItem('userTableDataSave', JSON.stringify(userBase));
};

const clearLocalSave = () => {
  localStorage.removeItem('userTableDataSave');
  parseUsers();
};
//user constructor
class newUser {
  constructor(firstName, lastName, userLog, userPass, regDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userLog = userLog;
    this.userPass = userPass;
    this.regDate = regDate;
  }
}
//user parser
let superIdGen = +new Date();
const parseUsers = () => {
  listUsers.textContent = '';
  userBase.map((el) => {
    superIdGen += 1;
    let li = document.createElement('li');
    li.innerHTML = `<li class="${superIdGen}"><button id="${superIdGen}">X</button>Имя: ${el.firstName} , Фамилия: ${el.lastName} , зарегистрирован: ${el.regDate}
    </li>`;
    listUsers.append(li);
    //update or add listeners for item removal
    document.getElementById(superIdGen).addEventListener('click', (e) => {
      if (e.target.parentNode.classList.contains(e.target.id.toString())) {
        [...userBase].forEach((item) => {
          if (
            item.firstName === e.target.parentNode.innerText.split(' ')[1] &&
            item.lastName === e.target.parentNode.innerText.split(' ')[4]
          ) {
            userBase.splice(userBase.indexOf(item), 1);
            parseUsers();
          }
        });
      }
      setLocalSave();
    });
  });
};
//draw user table on page
if (userBase.length > 0) {
  parseUsers();
}

const createUser = () => {
  let userName;
  do {
    userName = prompt('Введите имя и фамилию через пробел').trim();
  } while (userName.split(' ').length !== 2);
  const firstName = userName.split(' ')[0];
  const lastName = userName.split(' ')[1];
  const userLog = prompt('Введите логин');
  const userPass = prompt('Введите пароль');
  const regDate = `${date.toLocaleString('ru', options)}, ${timeWithZero(
    hour,
    minute,
    second
  )}`;
  userBase.push(new newUser(firstName, lastName, userLog, userPass, regDate));
  setLocalSave();
  parseUsers();
  console.log(`new user =>`, userBase[userBase.length - 1]);
};

const userAuth = () => {
  let userLogIn = prompt('Введите логин');
  let userPassWord = prompt('Введите пасроль');
  const findUser = [...userBase].filter(
    (el) => el.userLog === userLogIn && el.userPass === userPassWord
  );
  if (findUser.length < 1) {
    return alert(`${new Error()}! Пользователя с такими данными не существует`);
  }
  usernameField.textContent = findUser[0].firstName;
};

//dedicated listeners
registerUserBtn.addEventListener('click', () => {
  createUser();
});
loginBtn.addEventListener('click', () => {
  userAuth();
});
clearStorage.addEventListener('click', () => {
  clearLocalSave();
  console.log(`user base=>`, userBase);
});
