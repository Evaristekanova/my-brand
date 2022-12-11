'use strict'
////////////////////selection//////////////
const nav = document.querySelector('.navbar')
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide-component')
const rightBtn = document.querySelector('.arrow-left')
const leftBtn = document.querySelector('.arrow-right')
const link = document.querySelector('.nav-link')
const footLink = document.querySelector('.flink')
const humberger = document.querySelector('.humberger-icon')
const closeHumberger = document.querySelector('.close')
const humbergerContainer = document.querySelector('.humberger-container')
const resNav = document.querySelector('.reponsive-nav')
const navContainer = document.querySelector('.nav-container')
const normalLink = document.querySelectorAll('.nav-link')
// ================implementing scroll to clicked section section==============//
// ----------------navigation----------------//
navContainer.addEventListener('click', function(e){
	e.preventDefault()
	if(e.target.classList.contains('nav-link')){
		normalLink.forEach(el=>el.classList.remove('active-normal-link'))
		e.target.classList.add('active-normal-link')
	}
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
	e.preventDefault()
	const link = e.target
	if(link.classList.contains('nav-link')){
	const linkId = link.getAttribute('href')
	document.querySelector(linkId).scrollIntoView({behavior: 'smooth'})
}
})
// -----------footer link--------------------//
footLink.addEventListener('click', function(e){
	e.preventDefault()
	if(e.target.classList.contains('f-link')){
		const link = e.target
		const linkId = link.getAttribute('href')
		document.querySelector(linkId).scrollIntoView({behavior: 'smooth'})
	}
})
// ================implementing slide section==============//
///////////////////////
slides.forEach((slide, i) =>{
	slide.style.transform = `translateX(${i * 100}%)`
})
let curSlide = 0
const toSlide = function(s){
	slides.forEach((slide, i)=> slide.style.transform = `translateX(${(i - s) * 100}%)`)
}
rightBtn.addEventListener('click', function(e){
	e.preventDefault()
	if(curSlide === slides.length - 1) return
	else {
		curSlide++
	}
	toSlide(curSlide)
})

leftBtn.addEventListener('click', function(e){
	e.preventDefault()
	if(curSlide === 0) return
	else {
		curSlide--
	}
	toSlide(curSlide)
})
// ==========================implementation humberger functionality==================//
humberger.addEventListener('click', function(){
	humbergerContainer.style.visibility = 'visible'
	humbergerContainer.classList.add('active')
	humberger.style.visibility = 'hidden'
})
closeHumberger.addEventListener('click', function(){
	humbergerContainer.style.visibility = 'hidden'
	humbergerContainer.classList.remove('active')
	humberger.style.visibility = 'visible'
})