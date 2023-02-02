let parameter = new URLSearchParams(window.location.search);
const id = parameter.get('id');
const singleBlog = document.querySelector('.blog-single');
const curImage = document.getElementById('current-blog');
const curTitle = document.getElementById('current-title');
const curParagraph = document.getElementById('current-paragraph');
const blogToBeCurrent = document.getElementById('aBlog-listed');
const postComment = document.getElementById('post-btn');
const readBlog = document.querySelector('.single-blog-page-container');
const blogListContainer = document.querySelector('.blog-list-container');
let content = '';
// GET all BLOGS from api
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`)
  .then((res) => res.json())
  .then((blog) => {
    const allBlogs = blog.data;
    latestBlog = allBlogs.slice(-3);
    allBlogs.forEach((el) => {
      content += `
    <div class="blog-single-list">
    <div class="article-list">
        <a class="blog-link" href ='../html/readSingleBlog.html?id=${el._id}'id='aBlog-listed'><h3 class="blog-title">${el.title}</h3></a>
        <p>
            ${el.shortDescription}
    </div>
</div>
    `;
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
                    <input type="text" name="" id="commenter" placeholder="Enter your names here" required>
                    <textarea id="write-comment" placeholder="Add your comment here" required></textarea>
                </div>
                    <button class="btn post-btn" onClick = "postMessage()">post</button>
            </div>
        `;
          singleBlog.innerHTML = curContentPost;
        }
      });
    });
    blogListContainer.innerHTML = content;
  })
  .catch((err) => {
    console.log(err);
  });
