'use strict';
const token = JSON.parse(localStorage.getItem('token'));
if (!token) {
    window.location.assign('../html/login.html')
}
// ==================all decralation=====================//
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
  formData.append('fullDescription', blogFullDescription.value);
  formData.append('image', imageId.files[0]);
  console.log(formData);
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
    })
    .catch((error) => {
      console.log(error);
    });
});
