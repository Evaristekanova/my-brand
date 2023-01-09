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
  
  //   ===========declariling variables===============//
  const yes = document.getElementById('yes')
  const no = document.getElementById('no')
  const confirmBox = document.querySelector('.confirm-msg')
  const blogContainerDashoard = document.querySelector('.dashboard-blog-list')

let blogs = []
  dbCollection.on('value', function(snapshot){
    const blogArr = snapshot.val()
    blogContainerDashoard.innerHTML = ''
    for(var key in blogArr){
        const data = blogArr[key]
        blogContainerDashoard.innerHTML += `
        <div class="blog-name">
        <div class="blog-title-dashboard">
            <h3>${data.topic}</h3>
        </div>
        <div class="blog-operation">
            <button class="btn update-btn">uptade</button>
            <button class="btn dlt-btn" onclick="deleteData('${key}')">delete</button>
        </div>
        </div> `
    }
    })


function deleteData(key) {
    // Get a reference to the database
    var database = firebase.database();
  
    // Get a reference to the data that you want to delete
    var dbCollection = database.ref("/Blogs/" + key);
  
    // Use the `remove()` method to delete the data
    dbCollection.remove(deleteBlog(key)).then(function() {
      
      // Data deleted successfully
      console.log("Data deleted successfully");
    }).catch(function(error) {
      // An error occurred
      console.log("Error deleting data:" + error);
    });
  }


function deleteBlog(index) {
    layout.style.display = 'none'
    confirmBox.style.display = 'block'
    confirmBox.style.transform = 'scale(1.01)'
    confirmBox.style.transform = 'translateY(0)'
    confirmBox.style.transition = 'all .4s ease-in-out;'
  }
const delFun=function(){
  yes.addEventListener('click', function(e){
    e.preventDefault()
    confirmBox.style.transition = 'all .4s ease-in-out;'
    confirmBox.style.transform = 'scale(0.2)'
    confirmBox.style.transform = 'translateY(-500%)'
    confirmBox.style.display = 'none'
    layout.style.display = 'block'

    window.location.href = "dashboard.html"
})
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
}