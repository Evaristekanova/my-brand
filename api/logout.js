'use strict';
const logger = document.querySelector('#log');
const loggeRes = document.querySelector('#logg');
let token = JSON.parse(localStorage.getItem('token'));
let isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
if (token || isAdmin) {
  logger.innerHTML = 'Logout';
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
