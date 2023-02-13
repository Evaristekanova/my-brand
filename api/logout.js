'use strict'
const logger = document.getElementById('log')
let token = JSON.parse(localStorage.getItem('token'))
if (token) {
    logger.innerHTML = 'Logout'
    logger.addEventListener('click', () => { 
        localStorage.removeItem('token')
        // window.location.assign('../html/login.html')
    })
}
