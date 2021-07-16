'use strict';
const container = document.querySelector('.container');
const btns = document.querySelector('.btnHolder');
const pe = btns.querySelector('.pe');
const divan = btns.querySelector('.divan');

class DomElement {
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector,
    this.height = height,
    this.width = width,
    this.bg = bg,
    this.fontSize = fontSize;
  }
  selectorFilter() {
    if (this.selector[0] === '.') {
      return this.buildDiv(this.selector.slice(1));
    } else if (this.selector[0] === '#') {
      return this.buildP(this.selector.slice(1));
    } else {
      return new Error();
    }
  }
  buildDiv(el) {
    let htmlElement = document.createElement('div');
    htmlElement.setAttribute('class', el);
    this.fillCssText(htmlElement);
    btns.after(htmlElement);
  }
  buildP(el) {
    let htmlElement = document.createElement('p');
    htmlElement.setAttribute('id', el);
    this.fillCssText(htmlElement);
    btns.after(htmlElement);
  }
  fillCssText(el) {
    el.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; color: white`;
    if (el.classList.contains('cube')) {
      el.textContent = '😴';
    } else {
      el.textContent = (Math.random() * (987654321 - 100000000) + 100000000).toString(22);
    }
    return el;
  }
  launchListeners() {}
}

let createEl = new DomElement('.block', 100, 350, 'black', 55);
let createEl2 = new DomElement('#pock', 70, 500, 'pink', 40);
let createCube = new DomElement('.cube', 100, 100, 'cyan', 60);
createEl.selectorFilter();
createEl2.selectorFilter();

document.addEventListener('DOMContentLoaded', () => {
  createCube.selectorFilter();
  const cube = document.querySelector('.cube');
  let vert = 0,
    hor = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      cube.style.top = `${vert - 10}px`;
      cube.style['border-top'] = '5px solid purple';
      cube.textContent = '🔥';
      vert = vert - 10;
    } else if (e.key === 'ArrowDown') {
      cube.style.top = `${vert + 10}px`;
      cube.style['border-bottom'] = '5px solid purple';
      cube.textContent = '🔥';
      vert = vert + 10;
    } else if (e.key === 'ArrowLeft') {
      cube.style.left = `${hor - 10}px`;
      cube.style['border-left'] = '5px solid purple';
      cube.textContent = '🔥';
      hor = hor - 10;
    } else if (e.key === 'ArrowRight') {
      cube.style.left = `${hor + 10}px`;
      cube.style['border-right'] = '5px solid purple';
      cube.textContent = '🔥';
      hor = hor + 10;
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
      cube.style['border-top'] = '';
      cube.textContent = '🛑';
    } else if (e.key === 'ArrowDown') {
      cube.style['border-bottom'] = '';
      cube.textContent = '🛑';
    } else if (e.key === 'ArrowLeft') {
      cube.style['border-left'] = '';
      cube.textContent = '🛑';
    } else if (e.key === 'ArrowRight') {
      cube.style['border-right'] = '';
      cube.textContent = '🛑';
    }
  });
});

pe.addEventListener('click', () => {
  createEl2.selectorFilter();
});
divan.addEventListener('click', () => {
  createEl.selectorFilter();
});
