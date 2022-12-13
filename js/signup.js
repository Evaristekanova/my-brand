'use strict'
// ====================== javascript variable decralation =======================//
const signUpForm = document.querySelector('.signup-form')
const emailForSignUp = document.getElementById('email-signup')
const createPassword = document.getElementById('create-password')
const ConfirmPassword = document.getElementById('confirm-password')
const signUpBtn = document.querySelector('.signup-btn')
const error = document.querySelector('.error')
const errorConfirm = document.querySelector('.error-confirm')
// ======================= sign up form validation======================//
signUpForm.addEventListener('submit', function(e){
    e.preventDefault()
    const message = []
    error.style.color = 'red'
    error.style.fontSize = '16px'
    if(createPassword.value.length < 8){
        message.push('password is not long enough')
        error.innerHTML = message.join(' ')
    }
    else if(createPassword.value.length > 15){
        message.push('password is long than enough')
        error.innerHTML = message.join(' ')
    }
    else if((createPassword.value.length >= 8 && createPassword.value.length <= 15)&&
    (createPassword.value === ConfirmPassword.value)){
        console.log('good progress')
        emailForSignUp.value = createPassword.value = ConfirmPassword.value = ''
        window.location.assign('./blog.html')
    }
    else{
        message.push('incorrect password')
        errorConfirm.innerHTML = message.join(' ')
    }
})