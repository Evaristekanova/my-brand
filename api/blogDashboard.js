const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const token = JSON.parse(localStorage.getItem('token'));
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const layout = document.querySelector('.layout');
const confirmBox = document.querySelector('.confirm-msg');
const blogContainerDashoard = document.querySelector('.dashboard-blog-list');
let blogs, spesfiedBlog;
if (!token) {
  window.location.assign('../html/login')
}
wholeContainer.style.display = 'none';
preloader.style.display = 'block';
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`,{method:'GET'})
  .then((res) => res.json())
  .then((blog) => {
    let allBlogs = blog.data;
    blogs = allBlogs;
    allBlogs.reverse()
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
      mode: "cors"
    }
  )
    .then((res) => res.json())
    .then((result) => {
      confirmBox.style.transition = 'all .4s ease-in-out;';
      confirmBox.style.transform = 'scale(0.2)';
      confirmBox.style.transform = 'translateY(-500%)';
      confirmBox.style.display = 'none';
      window.location.assign('../html/dashboard.html')
      layout.style.display = 'block';
    });
}
