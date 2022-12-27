'use strict'

const blogContainerDashoard = document.querySelector('.dashboard-blog-list')
let blogArray = []
let data = localStorage.getItem('addresses')
blogArray = JSON.parse(data)
let content = ''



blogArray.forEach((el, i)=>{
    content += `
    <div class="blog-name">
    <div class="blog-title-dashboard">
        <h3>${el.topic}</h3>
    </div>
    <div class="blog-operation">
        <button class="btn update-btn">uptade</button>
        <button class="btn dlt-btn" onClick ="deleteBlog(${i})">delete</button>
    </div>
</div> `
})
 blogContainerDashoard.innerHTML += content

//  =====================giving life the update button===================//
function checker(){
    let result = confirm('Are you sure?')
    console.log(result);
    if(result == false){
        e.preventDefault();
    }
}
function deleteBlog(index) {
    checker()
    blogArray.splice(index, 1);
    localStorage.setItem('addresses', JSON.stringify(blogArray))
    window.location.href = "dashboard.html"
  }
