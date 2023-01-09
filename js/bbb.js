//<FETCHBLOG>
let blogC=""
let blogs = [];
let Data = localStorage.getItem("blogs");
blogs = JSON.parse(Data);
cards()
function cards(){
  for (let i = 0; i < blogs.length; i++){
    blogC+=
   `
  <div class="blogs">
            <div class="pic"><img src="${blogs[i].image}" alt=""></div>
            <div class="desc"><p>${blogs[i].blogContent}</p>
                <button onclick="morefun(${i})">more</button></div>
        </div>
   `
 };
}
document.getElementById("blo").innerHTML=blogC
//more blog
let mores=""
function morefun(index){
    mores =  `<div class="up"><img src="${blogs[index].image}" alt=""></div>
    <div class="down">
        <h3>${blogs[index].blogTitle}</h3>
        <p style="margin-top: 1rem;padding: .5rem;">
        ${blogs[index].blogContent}
        </p>
        <form id="commentForm">
           <textarea name="" id="commentField" cols="30" rows="10" style="margin-top: 3rem; border: 1px solid green;" placeholder="Add comment" ></textarea> <br>
           <button type="submit" id="but">Add Comment</button>
           <input type="hidden" value="${blogs[index].blogTitle}" id="blog-title"/>
           <div class="comment" id="commentsCard">
           </div>
           </form>
           `
           document.getElementById("alb").innerHTML=mores
       let Comment = localStorage.getItem("comment");
    if (Comment) {
        comments = JSON.parse(Comment);
       var commentsCard =""
              for (let i = 0; i < comments.length; i++){
        if(comments[i].blog==blogs[index].blogTitle)
        commentsCard +=
       `
       <i class="fa-solid fa-user" style="font-size: 30px;"></i>
       <p id="thiscom">${comments[i].comm}</p>
       `
       document.getElementById("commentsCard").innerHTML=commentsCard
    };
    }
    function saveComment() {
        var commentField = document.getElementById("commentField");
        var blogTitle=document.getElementById("blog-title")
        let commen = {
           comm:commentField.value,
           blog: blogTitle.value
        };
        comments.push(commen);
        setComment()
        morefun(index)
    };
    document.getElementById("commentForm").addEventListener('submit',saveComment)
}
//</FETCHBLOGS>
//<FETCH COMMENT>
var  comments = [];
//  commntsCard()
// function commntsCard(){
//   for (let i = 0; i < comments.length; i++){
//     commentsCard +=
//    `
//    <i class="fa-solid fa-user" style="font-size: 30px;"></i>
//    <p id="thiscom">${comments[i].comm}</p>
//    `
//  };
// }
//<FETCH COMMENT>