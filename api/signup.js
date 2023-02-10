'use strict';
// ====================== javascript variable decralation =======================//
const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const alertMsg = document.querySelector('.alert');
const signUpForm = document.querySelector('.signup-form');
const nameForm = document.getElementById('name-signup');
const emailForSignUp = document.getElementById('email-signup');
const createPassword = document.getElementById('create-password');
const ConfirmPassword = document.getElementById('confirm-password');
const signUpBtn = document.querySelector('.signup-btn');
const error = document.querySelector('.error');
const errorConfirm = document.querySelector('.error-confirm');
// =====================================================================///
const nav = document.querySelector('.navbar');
const humberger = document.querySelector('.humberger-icon');
const closeHumberger = document.querySelector('.close');
const humbergerContainer = document.querySelector('.humberger-container');
const resNav = document.querySelector('.reponsive-nav');
const navContainer = document.querySelector('.nav-container');
const normalLink = document.querySelectorAll('.nav-link');
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
nav.addEventListener('click', function (e) {
  // e.preventDefault()
  const link = e.target;
  if (link.classList.contains('nav-link')) {
    const linkId = link.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});
// resNav.addEventListener('click', function (e) {
//   const link = e.target;
//   if (link.classList.contains('nav-link')) {
//     e.preventDefault();
//     const linkId = link.getAttribute('href');
//     document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
//   }
// });
// ======================= sign up form validation======================//
signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const message = [];
  error.style.color = 'red';
  error.style.fontSize = '16px';
  if (createPassword.value.length < 8) {
    message.push('password is not long enough');
    error.innerHTML = message.join(' ');
    return;
  } else if (createPassword.value.length > 15) {
    message.push('password is longer than enough');
    error.innerHTML = message.join(' ');
    return;
  } else if (
    createPassword.value.length >= 8 &&
    createPassword.value.length <= 15 &&
    createPassword.value === ConfirmPassword.value
  ) {
    const data = {
      name: nameForm.value,
      email: emailForSignUp.value,
      password: createPassword.value,
    };
    wholeContainer.style.display = 'none';
    preloader.style.display = 'block';
    await fetch('https://important-suit-tuna.cyclic.app/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        if (user?.error) {
          preloader.style.display = 'none';
          wholeContainer.style.display = 'block';
          return alert('Email already taken');
         }
        preloader.style.display = 'none';
        wholeContainer.style.display = 'block';
        nameForm.value =
          emailForSignUp.value =
          createPassword.value =
          ConfirmPassword.value =
            '';
        alertMsg.style.display = 'block';
        setTimeout(() => {
          alertMsg.style.display = 'none';
        }, 3000);
      })
      .catch((err) => console.log(err));
  } else {
    message.push('incorrect password');
    errorConfirm.innerHTML = message.join(' ');
  }
});
