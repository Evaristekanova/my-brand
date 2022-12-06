'use strict'
////////////////////selection//////////////

const nav = document.querySelector('.navbar')
const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide-component')
const rightBtn = document.querySelector('.arrow-left')
const leftBtn = document.querySelector('.arrow-right')
// ================implementing scroll to clicked section section==============//

nav.addEventListener('click', function(e){
	e.preventDefault()
	const link = e.target
	console.log(link)
	if(link.classList.contains('nav-link')){
		console.log(link)
	const linkId = link.getAttribute('href')
	const scrol = document.querySelector(linkId)
	scrol.scrollIntoView({behavior: 'smooth'})
	}
	else{
		console.log('huzzo')
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