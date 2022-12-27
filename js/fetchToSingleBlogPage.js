'use strict mode'
const singleBlog = document.querySelector('.blog-single')
const curImage = document.getElementById('current-blog')
const curTitle = document.getElementById('current-title')
const curParagraph = document.getElementById('current-paragraph')
const blogToBeCurrent = document.getElementById('aBlog-listed')
const postComment = document.getElementById('post-btn')
const readBlog = document.querySelector('.single-blog-page-container')
const blogListContainer = document.querySelector('.blog-list-container')
let blogArray = []
let data = localStorage.getItem('addresses')
blogArray = JSON.parse(data)
let content = ''
let url
blogArray.forEach(el=>{
    content += `
    <div class="blog-single-list">
    <div class="article-list">
        <a href ='../html/readSingleBlog.html?id=${el.id}' id='aBlog-listed'><h3 class="blog-title">${el.topic}</h3></a>
        <p>
            ${(el.shortDescription)}
    </div>
</div>
    `
 let curContentPost
    let parameter=new URLSearchParams(window.location.search);
 const id = parameter.get('id');
url = id
    blogArray.find(blog=>{
        if(blog.id === id){
            curContentPost = `
            <img id="current-blog" src="${blog.image}" alt="" srcset="">
            <div class="article">
                <h3 class="blog-title" id="current-title">${blog.topic}</h3>
                <p id="current-paragraph">
                    ${blog.fullDescription}.
                </p>
                <div class="blog-comment">
                    <h3 class="add-comment-title">Add your comment</h3>
                    <input type="text" name="" id="commenter" placeholder="Enter your names here">
                    <textarea id="write-comment" placeholder="Add your comment here"></textarea>
                </div>
                    <button class="btn post-btn" onClick = "postMessage()">post</button>
            </div>
        `
        singleBlog.innerHTML = curContentPost
    }
})
})
blogListContainer.innerHTML = content

// ====================pushing message in message array stored in blog object======///
const messageDivisionContainer = document.querySelector('.blogs-block-single')
function postMessage(){
    blogArray.find(blog=>{
        const writeComment = document.getElementById('write-comment')
        const commenterName = document.getElementById('commenter')
        if(blog.id === url){
            const msgObject ={
                msg:writeComment.value,
                commenter:commenterName.value
            }

            console.log(writeComment.value);
            console.log(commenterName.value);
            blog.messages.push(msgObject)
            localStorage.setItem('addresses', JSON.stringify(blogArray))
        }
    })
    window.location. reload()
}
// =================================displaying the comments to HTML page ===========================//
let comment = ''
blogArray.find(el=>{
    if(el.id == url){
        if(el.messages.length == 0){
            singleBlog.innerHTML += 'No comment'
            return
        }
        singleBlog.innerHTML += 'Comments'
        // el.messages.forEach(el=>{
        //     comment += `
        //     <div class="dash-message">
        //     <div class="user">
        //     <h4 class="user-message">${el.commenter}</h4>
        //     </div>
        //     <p class="posted-comment">
        //     ${el.msg}
        //     </p>
        //     </div>
        //     `
        // })
        for(let i = el.messages.length - 1; i>= 0; i--){
            comment += `
            <div class="dash-message">
            <div class="user">
            <h4 class="user-message">${el.messages[i].commenter}</h4>
            </div>
            <p class="posted-comment">
            ${el.messages[i].msg}
            </p>
            </div>
            `
        }
        // messageDivisionContainer.innerHTML += comment
        singleBlog.innerHTML += comment
        // commentHolder.insertAdjacentHTML('afterbegin', comment)
        }
    })
    // readBlog.innerHTML += comment

