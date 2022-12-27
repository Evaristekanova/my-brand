'use strict'
// ==================all decralation=====================//
const imageId = document.getElementById('ffile')
const blogTitle = document.getElementById('ftitle')
const smallDescription = document.getElementById('small-description')
const addBlogBtn = document.getElementById('fsubmit')
const blogFullDescription = document.getElementById('editor')
const localStorageSpace = JSON.parse(localStorage.getItem("addresses") || "[]")

let image ;
imageId.addEventListener("change",function(){
const reader = new FileReader();

reader.addEventListener("load",() =>{
    image = reader.result;
});

reader.readAsDataURL(imageId.files[0]);
})


addBlogBtn.addEventListener('click', function(e){
    e.preventDefault()
    let topic = blogTitle.value
    let shortDescription= smallDescription.value
    let fullDescription = blogFullDescription.textContent
    let id  = new Date()
    let blog = {
        messages:[],
        id,image, topic, shortDescription, fullDescription
    }
    localStorageSpace.push(blog)
    blogTitle.value = smallDescription.value = blogFullDescription.textContent =''
    imageId.value= null
    localStorage.setItem("addresses", JSON.stringify(localStorageSpace));
})