import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function addOrderRow(drink) {
  const item = document.createElement('li');
  item.classList.add('.row-pending');
  item.textContent = `${drink} у роботі...`;
  orderLog.append(item);
  return item;
}

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const drink = formData.get('drink');
  const state = formData.get('state');

  const delay = PREP_TIME[drink];
  const shouldResolve = state === 'fulfilled';

  const row = addOrderRow(drink);

  makeOrder(delay, shouldResolve)
    .then(ms => {
      row.className = 'row-ok';
      row.textContent = `${drink} готове ${ms} ms`;
    })
    .catch(ms => {
      row.className = 'row-err';
      row.textContent = `${drink} скасовано ${ms} ms`;
    })
    .finally(() => {
      const finishedAt = new Date().toLocaleTimeString('uk-UA');
      row.textContent += `${finishedAt}`;
    });
});
