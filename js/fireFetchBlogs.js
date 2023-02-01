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
console.log('hello here');
const blogContainer = document.querySelector('.blogs-block')
let content=''

dbCollection.on('value', function(snapshot){
    const blogArr = snapshot.val()
    for(var key in blogArr){
        const data = blogArr[key]
        console.log(data);
        content += `
        <div class="blog">
        <img src="${data.blogImg}" alt="" srcset="">
        <div class="article">
        <h3 class="blog-title">${data.topic}</h3>
                <p>
                    ${data.shortDescription}
                    <span><a class="read-whole-blog" href="./html/readSingleBlog.html?id=${key}">read more</a></span>
                </p>
            </div>
        </div>
        `
    }
    document.createElement('div').classList.add('blog')
    blogContainer.innerHTML += content
    })