const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
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
const snackbar = document.querySelector('.snackbar');
let blogs;
// ========================form submission====================///
let defaultBlog;
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`, {
  method: 'GET',
})
  .then((res) => res.json())
  .then((blog) => {
    const allBlogs = blog.data;
    blogs = allBlogs.reverse();
    defaultBlog = blogs[0];
  });
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
    wholeContainer.style.display = 'none';
    preloader.style.display = 'block';
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
        if (user.message === 'incorrect username or password') {
          preloader.style.display = 'none';
          wholeContainer.style.display = 'block';
          snackbar.style.display = 'grid';
          setTimeout(() => {
            snackbar.style.display = 'none';
          }, 3500);
          return;
        }
        const userStuff = user.user;
        const isAdmin = userStuff?.isAdmin;
        (loginEmail.value = ''), (loginPasswd.value = '');
        const message = user.message;
        const accessToken = user.data;
        if (accessToken) {
          localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
          localStorage.setItem('token', JSON.stringify(accessToken));
          preloader.style.display = 'none';
          wholeContainer.style.display = 'block';
          if (isAdmin === true) {
            window.location.assign('./dashboard.html');
          } else {
            window.location.assign(
              `./readSingleBlog.html?id=${defaultBlog._id}`
            );
          }
        }
      })
      .catch((err) => console.log(err));
  }
});
