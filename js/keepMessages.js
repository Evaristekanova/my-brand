'use strict'
// import { secarchID } from "./fetchToSingleBlogPage"
console.log(messageDivisionContainer);
let blogArray = []
let data = localStorage.getItem('addresses')
blogArray = JSON.parse(data)
console.log(blogArray);
// console.log(postComment);
console.log(secarchID);
let content
const messageDivisionContainer = document.querySelector('.message-division')
content = `
    <div class="dash-message">
        <div class="user">
            <h4 class="user-message">Kanova</h4>
        <h6 class="user-email">kanova@gmail.com</h6>
        </div>
        <p class="posted-image">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
    </div>
    `