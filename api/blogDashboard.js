const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const token = JSON.parse(localStorage.getItem('token'));
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const layout = document.querySelector('.layout');
const confirmBox = document.querySelector('.confirm-msg');
const alertMsg = document.querySelector('.alert');
const snackbar = document.querySelector('.snackbar');
const snackbarMsg = document.querySelector('.snackbar_message');
const blogContainerDashoard = document.querySelector('.dashboard-blog-list');
const form = document.getElementById('form');
const imageId = document.getElementById('ffile');
const blogTitle = document.getElementById('ftitle');
const smallDescription = document.getElementById('small-description');
const blogFullDescription = document.getElementById('editor');
let blogs, spesfiedBlog;
const upBlog = document.getElementById('update-cont');
const normal = document.getElementById('normal');
logout.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.removeItem('token');
  window.location.assign('../index.html');
});
if (!token) {
  window.location.assign('../html/login');
}
wholeContainer.style.display = 'none';
preloader.style.display = 'block';
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`, {
  method: 'GET',
})
  .then((res) => res.json())
  .then((blog) => {
    let allBlogs = blog.data;
    blogs = allBlogs;
    allBlogs.reverse();
    allBlogs.forEach((el) => {
      blogContainerDashoard.innerHTML += `
        <div class="blog-name">
        <div class="blog-title-dashboard">
            <h3>${el.title}</h3>
        </div>
        <div class="blog-operation">
            <button class="btn update-btn">uptade</button>
            <button class="btn dlt-btn"">delete</button>
        </div>
        </div> `;
    });
    preloader.style.display = 'none';
    wholeContainer.style.display = 'block';
    let deleteBtn = document.querySelectorAll('.dlt-btn');
    const updateBtn = document.querySelectorAll('.update-btn');
    deleteBtn.forEach((btn, i) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        layout.style.display = 'none';
        confirmBox.style.display = 'block';
        confirmBox.style.transform = 'scale(1.01)';
        confirmBox.style.transform = 'translateY(0)';
        spesfiedBlog = blogs[i];
        yes.addEventListener('click', function (e) {
          e.preventDefault();
          deleteBlog();
        });
        no.addEventListener('click', function (e) {
          e.preventDefault();
          confirmBox.style.transition = 'all .4s ease-in-out;';
          confirmBox.style.transform = 'scale(0.2)';
          confirmBox.style.transform = 'translateY(-500%)';
          confirmBox.style.display = 'none';
          layout.style.display = 'block';
          document.getElementById('body').style.width = '100%';
          return;
        });
      });
    });
    updateBtn.forEach((btn, i) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        normal.style.display = 'none';
        upBlog.style.display = 'block';
        spesfiedBlog = blogs[i];
        console.log(spesfiedBlog);
        blogTitle.value = spesfiedBlog.title;
        smallDescription.value = spesfiedBlog.shortDescription;
        blogFullDescription.textContent = spesfiedBlog.fullDescription;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData();
          formData.append('title', blogTitle.value);
          formData.append('shortDescription', smallDescription.value);
          formData.append('fullDescription', blogFullDescription.textContent);
          formData.append('image', imageId.files[0]);
          updateBlog(formData);
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

async function deleteBlog() {
  await fetch(
    `https://important-suit-tuna.cyclic.app/api/v1/blogs/${spesfiedBlog._id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
    }
  )
    .then((res) => res.json())
    .then((result) => {
      confirmBox.style.transition = 'all .4s ease-in-out;';
      confirmBox.style.transform = 'scale(0.2)';
      confirmBox.style.transform = 'translateY(-500%)';
      confirmBox.style.display = 'none';
      window.location.assign('../html/dashboard.html');
      layout.style.display = 'block';
    });
}

async function updateBlog(data) {
  wholeContainer.style.display = 'none';
  preloader.style.display = 'block';
  await fetch(
    `https://important-suit-tuna.cyclic.app/api/v1/blogs/update/${spesfiedBlog._id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors',
      body: data,
    }
  )
    .then((res) => res.json())
    .then((result) => {
      blogTitle.value = '';
      smallDescription.value = '';
      blogFullDescription.textContent = '';
      imageId.files[0] = null;
      wholeContainer.style.display = 'block';
      preloader.style.display = 'none';
      snackbarMsg.innerHTML = 'Blog Updated Successfully';
      snackbar.style.backgroundColor = '#367e54';
      snackbar.style.display = 'grid';
      setTimeout(async () => {
        snackbar.style.display = 'none';
      }, 3500);
      normal.style.display = 'block';
      upBlog.style.display = 'none';
    });
}
