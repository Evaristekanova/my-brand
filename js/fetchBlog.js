'use strict'
const blogContainer = document.querySelector('.blogs-block')
let blogArray = []
let data = localStorage.getItem('addresses')
blogArray = JSON.parse(data)
let content = ''

blogArray.forEach(el=>{
    const time = new Date()
    const hour = time.getHours()
    const min = time.getMinutes()
    const month = time.getMonth()
    const year = time.getFullYear()
    const date = time.getDate()
    // <p class = "time">${year}-${month}-${date} at ${hour}:${min} </p>
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

