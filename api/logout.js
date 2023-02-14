'use strict';
const logger = document.querySelector('#log');
const loggeRes = document.querySelector('#logg');
let token = JSON.parse(localStorage.getItem('token'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
console.log(isAdmin, token);
if (token || isAdmin) {
  console.log('hello from Logout');
  logger.innerHTML = 'Logout';
  console.log(logger);
  logger.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      location.reload();
  });
  loggeRes.innerHTML = 'Logout';
  loggeRes.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    location.reload();
  });
}
