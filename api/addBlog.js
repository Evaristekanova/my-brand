'use strict';
const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const snackbar = document.querySelector('.snackbar');
const snackbarMsg = document.querySelector('.snackbar_message');
logout.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.assign('../index.html');
});
const token = JSON.parse(localStorage.getItem('token'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
if (!token || isAdmin === false) {
  window.location.assign('../html/login.html');
}
// ==================all decralation=====================//
const alertMsg = document.querySelector('.alert');
const form = document.getElementById('form');
const imageId = document.getElementById('ffile');
const blogTitle = document.getElementById('ftitle');
const smallDescription = document.getElementById('small-description');
const addBlogBtn = document.getElementById('fsubmit');
const blogFullDescription = document.getElementById('editor');
const failMsg = document.querySelector('.fail');
const successMsg = document.querySelector('.success');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('title', blogTitle.value);
  formData.append('shortDescription', smallDescription.value);
  formData.append('fullDescription', blogFullDescription.textContent);
  formData.append('image', imageId.files[0]);
  wholeContainer.style.display = 'none';
  preloader.style.display = 'block';
  fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((blog) => {
      console.log(blog);
      if (blog.message === 'all fields are required') {
        preloader.style.display = 'none';
        wholeContainer.style.display = 'block';
        snackbarMsg.innerHTML = 'all fields are required';
        snackbar.style.display = 'grid';
        setTimeout(() => {
          snackbar.style.display = 'none';
        }, 3500);
        return;
      }
      blogTitle.value = '';
      smallDescription.value = '';
      blogFullDescription.textContent = '';
      imageId.value = null;
      preloader.style.display = 'none';
      wholeContainer.style.display = 'block';
      snackbarMsg.innerHTML = 'Blog added successfully';
      snackbar.style.backgroundColor = '#367e54';
      snackbar.style.display = 'grid';
      setTimeout(() => {
        snackbar.style.display = 'none';
      }, 3500);
    })
    .catch((error) => {
      console.log(error);
    });
});
