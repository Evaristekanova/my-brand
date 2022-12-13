'use strict'
// ===========================varable decralation==============///
const errorLoginPasswd = document.querySelector('.error-login-password')
const loginForm = document.querySelector('.login-form')
const loginEmail = document.querySelector('.email-login')
const loginPasswd = document.getElementById('password-login')
// ========================form submission====================///

loginForm.addEventListener('submit', function(e){
    errorLoginPasswd.style.color = 'red'
    errorLoginPasswd.style.fontSize = '16px'
    const message = []
    e.preventDefault()
    if(loginPasswd.value.length < 8 || loginPasswd.value.length >15){
        message.push('incorrect password')
        errorLoginPasswd.innerHTML = message.join(' ')
    }
    else{
        window.location.assign('./dashboard.html')
    }
})