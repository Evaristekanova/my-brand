'use strict';
const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
////////////////////selection//////////////
const fullHeader = document.querySelector('#home');
const nav = document.querySelector('.navbar');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide-component');
const rightBtn = document.querySelector('.arrow-left');
const leftBtn = document.querySelector('.arrow-right');
const link = document.querySelector('.nav-link');
const footLink = document.querySelector('.footer-nav');
const closeHumberger = document.querySelector('.close');
const humbergerContainer = document.querySelector('.humberger-container');
const resNav = document.querySelector('.reponsive-nav');
const navContainer = document.querySelector('.nav-container');
const humberger = document.querySelector('.humberger-icon');
const normalLink = document.querySelectorAll('.nav-link');
// -----------contact form variable decralation-------////
const emailContact = document.getElementById('contact-email');
const firstName = document.getElementById('contact-fname');
const secondName = document.getElementById('contact-sname');
const textarea = document.getElementById('textarea');
const contactForm = document.querySelector('.contact-form');
const errorFname = document.querySelector('.error-fname');
const errorSname = document.querySelector('.error-sname');
const emailError = document.querySelector('.error-email');
const textareaError = document.querySelector('.error-textarea');
// ==========================implementation humberger functionality==================//
const humbergerIcon = humberger.addEventListener('click', function () {
  humbergerContainer.style.visibility = 'visible';
  humbergerContainer.classList.add('active');
  humberger.style.visibility = 'hidden';
});
const humbergerCloseIcon = closeHumberger.addEventListener(
  'click',
  function () {
    humbergerContainer.style.visibility = 'hidden';
    humbergerContainer.classList.remove('active');
    humberger.style.visibility = 'visible';
  }
);
const alertMsg = document.querySelector('.alert');
// ================implementing scroll to clicked section section==============//
// ----------------navigation----------------//
navContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-link')) {
    e.preventDefault();
    normalLink.forEach((el) => el.classList.remove('active-normal-link'));
    e.target.classList.add('active-normal-link');
  }
});
nav.addEventListener('click', function (e) {
  // e.preventDefault()
  const link = e.target;
  if (link.classList.contains('nav-link')) {
    const linkId = link.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});
resNav.addEventListener('click', function (e) {
  const link = e.target;
  if (link.classList.contains('nav-link')) {
    e.preventDefault();
    const linkId = link.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});
// -----------footer link--------------------//
footLink.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('f-link')) {
    const link = e.target;
    const linkId = link.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});
// ================implementing slide section==============//
///////////////////////
slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;
});
let curSlide = 0;
const toSlide = function (s) {
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${(i - s) * 100}%)`)
  );
};
rightBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (curSlide === slides.length - 1) return;
  else {
    curSlide++;
  }
  toSlide(curSlide);
});

leftBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (curSlide === 0) return;
  else {
    curSlide--;
  }
  toSlide(curSlide);
});
// =======================IMPLEMENTING STICKY NAVIGATION==========================//
const stickyNav = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) navContainer.classList.add('sticky');
    else navContainer.classList.remove('sticky');
  });
};
//   const navHeight = nav.getBoundingClientRect().height;
//   console.log(navHeight)
const intersectionAPI = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-90px`,
});
intersectionAPI.observe(fullHeader);

//   ==========================contact form validation ========================//
const messagesStore = JSON.parse(
  localStorage.getItem('contactMessages') || '[]'
);
contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  let resMessage;
  const message = [];
  const messageText = [];
  if (
    firstName.value == '' ||
    firstName.value.trim() == '' ||
    secondName.value == '' ||
    secondName.value.trim() == ''
  ) {
    message.push('Names are required');
    errorFname.innerHTML = message.join(',');
  }
  if (textarea.value.trim() == '' || textarea.value == '') {
    messageText.push('please write message');
    textareaError.innerHTML = messageText.join(' ');
  } else {
    const messageBox = {
      firstName: firstName.value,
      secondName: secondName.value,
      email: emailContact.value,
      messages: textarea.value,
    };
    wholeContainer.style.display = 'none';
    preloader.style.display = 'block';
    await fetch('https://important-suit-tuna.cyclic.app/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageBox),
    })
      .then((res) => res.json())
      .then((data) => {
        resMessage = data.message;
        preloader.style.display = 'none';
        wholeContainer.style.display = 'block';
        textarea.value =
          firstName.value =
          secondName.value =
          emailContact.value =
            '';
        errorFname.innerHTML = '';
        emailError.innerHTML = '';
        textareaError.innerHTML = '';
        window.location.assign('../index.html#contact')
        alertMsg.style.display = 'block';
        setTimeout(() => {
          alertMsg.style.display = 'none';
        }, 3000);
      })
      .catch((err) => console.log(err));
    }
  });
