const sendMessage = document.querySelector('.contact-btn');
sendMessage.addEventListener('click', function(e){

})
const firstName = document.getElementById('contact-fname').value
const secondName = document.getElementById('contact-sname').value
const email = document.getElementById('contact-email').value
const message = document.getElementById('textarea').value
fetch('https://important-suit-tuna.cyclic.app/api/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ firstName, secondName, email, message }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
