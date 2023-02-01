'use strict'
const nav = document.querySelector('.navbar')
const humberger = document.querySelector('.humberger-icon')
const closeHumberger = document.querySelector('.close')
const humbergerContainer = document.querySelector('.humberger-container')
const resNav = document.querySelector('.reponsive-nav')
const navContainer = document.querySelector('.nav-container')
const normalLink = document.querySelectorAll('.nav-link')
// ===========================varable decralation==============///
const errorLoginPasswd = document.querySelector('.error-login-password')
const loginForm = document.querySelector('.login-form')
const loginEmail = document.querySelector('.email-login')
const loginPasswd = document.getElementById('password-login')
// ========================form submission====================///

const humbergerIcon = humberger.addEventListener('click', function(){
	humbergerContainer.style.visibility = 'visible'
	humbergerContainer.classList.add('active')
	humberger.style.visibility = 'hidden'
})
const humbergerCloseIcon = closeHumberger.addEventListener('click', function(){
	humbergerContainer.style.visibility = 'hidden'
	humbergerContainer.classList.remove('active')
	humberger.style.visibility = 'visible'
})
nav.addEventListener('click', function(e){
	// e.preventDefault()
	const link = e.target
	if(link.classList.contains('nav-link')){
		const linkId = link.getAttribute('href')
	document.querySelector(linkId).scrollIntoView({behavior: 'smooth'})
	}
})
resNav.addEventListener('click', function(e){
	const link = e.target
	if(link.classList.contains('nav-link')){
		e.preventDefault()
	const linkId = link.getAttribute('href')
	document.querySelector(linkId).scrollIntoView({behavior: 'smooth'})
}
})
// =============login form validation==================//
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