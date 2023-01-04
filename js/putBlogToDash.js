'use strict'
const layout = document.querySelector('.layout')
const yes = document.getElementById('yes')
const no = document.getElementById('no')
const confirmBox = document.querySelector('.confirm-msg')
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
}
function deleteBlog(index) {
    layout.style.display = 'none'
    confirmBox.style.display = 'block'
    confirmBox.style.transform = 'scale(1.01)'
    confirmBox.style.transform = 'translateY(0)'
    confirmBox.style.transition = 'all .4s ease-in-out;'
    no.addEventListener('click', function(e){
        e.preventDefault()
        confirmBox.style.transition = 'all .4s ease-in-out;'
        confirmBox.style.transform = 'scale(0.2)'
        confirmBox.style.transform = 'translateY(-500%)'
        confirmBox.style.display = 'none'
        layout.style.display = 'block'
        body.style.width = '100%'

            return
    })
    yes.addEventListener('click', function(e){
        e.preventDefault()
        confirmBox.style.transition = 'all .4s ease-in-out;'
        confirmBox.style.transform = 'scale(0.2)'
        confirmBox.style.transform = 'translateY(-500%)'
        confirmBox.style.display = 'none'
        layout.style.display = 'block'
        blogArray.splice(index, 1);
        localStorage.setItem('addresses', JSON.stringify(blogArray))
        window.location.href = "dashboard.html"
    })

  }
