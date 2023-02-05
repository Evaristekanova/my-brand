const nav = document.querySelector('.navbar');
const humberger = document.querySelector('.humberger-icon');
const closeHumberger = document.querySelector('.close');
const humbergerContainer = document.querySelector('.humberger-container');
const resNav = document.querySelector('.reponsive-nav');
const navContainer = document.querySelector('.nav-container');
const normalLink = document.querySelectorAll('.nav-link');
// ===========================varable decralation==============///
const errorLoginPasswd = document.querySelector('.error-login-password');
const loginForm = document.querySelector('.login-form');
const loginEmail = document.getElementById('email-login');
const loginPasswd = document.getElementById('password-login');
const alertMsg = document.querySelector('.alert');
// ========================form submission====================///

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
resNav.addEventListener('click', function (e) {
  const link = e.target;
  if (link.classList.contains('nav-link')) {
    e.preventDefault();
    const linkId = link.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});
// =============login form validation==================//
loginForm.addEventListener('submit', function (e) {
  errorLoginPasswd.style.color = 'red';
  errorLoginPasswd.style.fontSize = '16px';
  const message = [];
  e.preventDefault();
  if (loginPasswd.value.length < 7 || loginPasswd.value.length > 15) {
    message.push('incorrect password');
    errorLoginPasswd.innerHTML = message.join(' ');
  } else {
    fetch('https://important-suit-tuna.cyclic.app/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPasswd.value,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        loginEmail.value = '', 
        loginPasswd.value = '', 
        console.log(user);
        // alertMsg.style.display = 'block';
        // setTimeout(() => {
        //   alertMsg.style.display = 'none';
        // }, 3000);
        const message = user.message;
        const isAdmin = user.user.isAdmin
        const accessToken = user.data;
        console.log(isAdmin);
        if (accessToken) {
          localStorage.setItem('token', JSON.stringify(accessToken));
          if (isAdmin === true) {
            console.log('hey its me again');
            window.location.assign('./dashboard.html');
          } else {
            console.log('okay');
            window.location.assign(
              './readSingleBlog.html?id=63d7428dd50a2dbceb79ec91'
            );
          }
        }
      }).catch(err=> console.log(err));
  }
});
