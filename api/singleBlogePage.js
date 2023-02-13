let parameter = new URLSearchParams(window.location.search);
const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const id = parameter.get('id');
const commentContainer = document.getElementById('comment-holder');
const singleBlog = document.querySelector('.blog-single');
const curImage = document.getElementById('current-blog');
const curTitle = document.getElementById('current-title');
const curParagraph = document.getElementById('current-paragraph');
const blogToBeCurrent = document.getElementById('aBlog-listed');
const readBlog = document.querySelector('.single-blog-page-container');
const blogListContainer = document.querySelector('.blog-list-container');
const messageDivisionContainer = document.querySelector('.blogs-block-single');
const article = document.querySelector('.article');
let content = '';
let postComments;
const snackbar = document.querySelector('.snackbar');
const snackbarMsg = document.querySelector('.snackbar_message');
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
// GET all BLOGS from api
wholeContainer.style.display = 'none';
preloader.style.display = 'block';
let everyBlog;
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`)
  .then((res) => res.json())
  .then((blog) => {
    const allBlogs = blog.data;
    everyBlog = allBlogs;
    latestBlog = allBlogs.slice(-3);
    allBlogs.forEach((el) => {
      content += `
    <div class="blog-single-list">
    <div class="article-list">
        <a class="blog-link" href ='../html/readSingleBlog.html?id=${el._id}'id='aBlog-listed'>
        <h3 class="blog-title">${el.title}</h3>
        </a>
        <p>
            ${el.shortDescription}
    </div>
</div>
    `;
    });
    let curContentPost;
    let parameter = new URLSearchParams(window.location.search);
    const id = parameter.get('id');
    url = id;
    allBlogs.find((blog) => {
      if (blog._id === id) {
        curContentPost = `
            <img id="current-blog" src="${blog.imageUrl}">
            <div class="article">
                <h3 class="blog-title" id="current-title">${blog.title}</h3>
                <p id="current-paragraph">
                    ${blog.fullDescription}.
                </p>
                <div class="blog-comment">
                    <h3 class="add-comment-title">Add your comment</h3>
                    <textarea id="write-comment" placeholder="Add your comment here" required></textarea>
                </div>
                    <button class="btn post-btn" onClick = "postMessage()">post</button>
                </div>
        `;
        singleBlog.innerHTML = curContentPost;
        if (blog.comments.length > 0) {
          fetch(
            `https://important-suit-tuna.cyclic.app/api/v1/blogs/${blog._id}/comments`,
            {
              mode: 'cors',
              method: 'GET',
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              const theseComments = data.data
                .filter((comment) => comment.blog === blog._id)
                .reverse();
              // console.log(theseComments);
              let comments = '';
              theseComments.forEach((comment) => {
                comments = `
            <div class="dash-message">
            <div class="user">
            <h4 class="user-message">${comment.userName}</h4>
            </div>
            <p class="posted-comment">
            ${comment.commentContent}
            </p>
            </div>
            `;
                singleBlog.innerHTML += comments;
              });
            });
        } else {
          comments = 'no comments yet';
          singleBlog.innerHTML += comments;
        }
      }
    });
    blogListContainer.innerHTML = content;
    preloader.style.display = 'none';
    wholeContainer.style.display = 'block';
  })
  .catch((err) => {
    console.log(err);
  });
function postMessage() {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
      wholeContainer.style.display = 'block';
      preloader.style.display = 'none';
    alert('Please login to comment');
    window.location.assign('../html/login.html');
    return;
  }
  const commentField = document.getElementById('write-comment');
  const comment = document.getElementById('write-comment').value;
  if (comment == '' || comment.trim() == '') {
    snackbarMsg.innerHTML = 'please write a comment';
    snackbar.style.display = 'grid';
    setTimeout(() => {
      snackbar.style.display = 'none';
    }, 3500);
    return;
  }
  const commentContent = comment;
  wholeContainer.style.display = 'none';
  preloader.style.display = 'block';
  fetch(
    `https://important-suit-tuna.cyclic.app/api/v1/blogs/${id}/newcomment`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: JSON.stringify({ commentContent }),
    }
  )
    .then((res) => res.json())
    .then((comment) => {
      console.log(comment);
      commentField.value = '';
      window.location.reload();
      preloader.style.display = 'none';
      wholeContainer.style.display = 'block';
    });
}
