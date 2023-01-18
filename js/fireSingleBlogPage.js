const firebaseConfig = {
    apiKey: "AIzaSyAWdGxVufTXjv_asn-JH2uhvxSxk9-COfQ",
    authDomain: "mydb-10ee3.firebaseapp.com",
    databaseURL: "https://mydb-10ee3-default-rtdb.firebaseio.com",
    projectId: "mydb-10ee3",
    storageBucket: "mydb-10ee3.appspot.com",
    messagingSenderId: "697794635786",
    appId: "1:697794635786:web:04ce631b6fe967bf7d17f3"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let dbCollection = firebase.database().ref('/Blogs')


  const singleBlog = document.querySelector('.blog-single')
const curImage = document.getElementById('current-blog')
const curTitle = document.getElementById('current-title')
const curParagraph = document.getElementById('current-paragraph')
const blogToBeCurrent = document.getElementById('aBlog-listed')
const postComment = document.getElementById('post-btn')
const readBlog = document.querySelector('.single-blog-page-container')
const blogListContainer = document.querySelector('.blog-list-container')

let parameter=new URLSearchParams(window.location.search);
const id = parameter.get('id');

dbCollection.on('value', function(snapshot){
    const blogArr = snapshot.val()
    for(const key in blogArr){
        const blog = blogArr[key]
    if(key === id){
        curContentPost = `
        <img id="current-blog" src="${blog.blogImg}">
        <div class="article">
            <h3 class="blog-title" id="current-title">${blog.topic}</h3>
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
    `
    singleBlog.innerHTML = curContentPost
    }
}
})

  dbCollection.on('value', function(snapshot){
    const blogArr = snapshot.val()
    console.log(blogArr);
    let content = ''
    for(var key in blogArr){
        const data = blogArr[key]
        console.log(data);
        content += `
        <div class="blog-single-list">
        <div class="article-list">
        <h3 class="blog-title">${data.topic}</h3>
        <p>
        ${(data.shortDescription)}
        </div>
        <button onclick ="readsingleBlog('${key}')"><h3 class="blog-title">more</h3><button>
    </div>
        `
    }
    document.createElement('div').classList.add('blog')
    blogListContainer.innerHTML = content
    })

//     let parameter=new URLSearchParams(window.location.search);
//     const id = parameter.get('id');
//    url = id
        function readsingleBlog(key){
            let dbCollection = firebase.database().ref('/Blogs/' + key)
            dbCollection.on('value', function(snapshot){
                blog = snapshot.val()

            })
               curContentPost = `
               <img id="current-blog" src="${blog.blogImg}" alt="" srcset="">
               <div class="article">
                   <h3 class="blog-title" id="current-title">${blog.topic}</h3>
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
           `
           singleBlog.innerHTML = curContentPost
        }
   