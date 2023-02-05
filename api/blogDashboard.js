const yes = document.getElementById('yes');
const no = document.getElementById('no');
const confirmBox = document.querySelector('.confirm-msg');
const blogContainerDashoard = document.querySelector('.dashboard-blog-list');

(async function blogs(){ 
  await fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`)
  .then((res) => res.json())
  .then((blog) => {
    const allBlogs = blog.data;
    allBlogs.forEach((el) => {
     blogContainerDashoard.innerHTML += `
        <div class="blog-name">
        <div class="blog-title-dashboard">
            <h3>${el.title}</h3>
        </div>
        <div class="blog-operation">
            <button class="btn update-btn">uptade</button>
            <button class="btn dlt-btn" onclick="deleteData()">delete</button>
        </div>
        </div> `;
      // console.log(el.id);
    });
    // const aBlog = document.createElement('div').classList.add('blog');
    // blogContainer.innerHTML += content;
  })
  .catch((err) => {
    console.log(err);
  });
})()
const deleteBtn = document.querySelectorAll('.dlt-btn');