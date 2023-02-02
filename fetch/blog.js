const blogContainer = document.querySelector('.blogs-block');
let content = '';
// GET all BLOGS from api

const aBlog = document.createElement('div').classList.add('blog');
blogContainer.innerHTML += content;
fetch(`https://important-suit-tuna.cyclic.app/api/v1/blogs/all`)
  .then((res) => res.json())
  .then((blog) => {
    const allBlogs = blog.data;
    latestBlog = allBlogs.slice(-3);
    latestBlog.reverse()
    latestBlog.forEach((el) => {
      content += `
        <div class="blog">
        <img src="${el.imageUrl}" alt="" srcset="">
        <div class="article">
        <h3 class="blog-title">${el.title}</h3>
                <p>
                    ${el.shortDescription}
                    <span><a class="read-whole-blog" href="./html/readSingleBlog.html?id=${el._id}">read more</a></span>
                </p>
            </div>
        </div>
        `;
      // console.log(el.id);
    });
    const aBlog = document.createElement('div').classList.add('blog');
    blogContainer.innerHTML += content;
  })
  .catch((err) => {
    console.log(err);
  });
