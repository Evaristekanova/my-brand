'use strict'
const blogContainer = document.querySelector('.blogs-block')
let blogArray = []
let data = localStorage.getItem('addresses')
blogArray = JSON.parse(data)
console.log(blogArray)
let content = ''

blogArray.forEach(el=>{
    content += `
    <div class="blog">
            <img src="${el.image}" alt="" srcset="">
            <div class="article">
                <h3 class="blog-title">${el.topic}</h3>
                <p>
                    ${el.shortDescription}
                    <span><a class="read-whole-blog" href="../html/readSingleBlog.html">read more</a></span>
                </p>
            </div>
        </div>
    `
})
 const aBlog = document.createElement('div').classList.add('blog')
 blogContainer.innerHTML += content

