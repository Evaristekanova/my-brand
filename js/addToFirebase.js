
   // Your web app's Firebase configuration
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
  console.log('hello');
  const imageId = document.getElementById('ffile')
const blogTitle = document.getElementById('ftitle')
const smallDescription = document.getElementById('small-description')
const blogFullDescription = document.getElementById('editor')
const form = document.getElementById('form')
const failMsg = document.querySelector('.fail')
const successMsg = document.querySelector('.success')

  let image
imageId.addEventListener("change",(e)=>{
    
    const img=e.target.files[0];

    const reader=new FileReader();

    reader.readAsDataURL(img);
  
    reader.addEventListener("load",()=>{
        image=reader.result;

    });
});
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let topic = blogTitle.value
    let shortDescription= smallDescription.value
    let fullDescription = blogFullDescription.textContent
    if(topic.trim() == '' || shortDescription.trim() == '' || fullDescription.trim() == '' || image == null){
      const alertMsg = document.querySelector('.alert')
      failMsg.style.display = 'block'
      return
  }
  else{
      failMsg.style.display = 'none'
      successMsg.style.display = 'block'
      setTimeout(()=>{
      successMsg.style.display = 'none'
      }, 3000)
  }
    let dbCollection = firebase.database().ref('/Blogs')
    dbCollection.push({
      topic:topic,
      shortDescription:shortDescription,
      fullDescription:fullDescription,
      blogImg: image
    })
    blogTitle.value = smallDescription.value = blogFullDescription.textContent = ''
    imageId.value = null
  })
  // form.reset()