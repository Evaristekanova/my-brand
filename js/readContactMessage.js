'use strict'
const messageContainer = document.querySelector('.main-header-dashboard')
const totalMessages = document.querySelector('.blog-number')
let contactMessageArr = []
const allMessages = localStorage.getItem('contactMessages')
contactMessageArr = JSON.parse(allMessages)
totalMessages.innerHTML = contactMessageArr.length

let message = ''
for(let i = contactMessageArr.length - 1; i >= 0; i--){

	message += `<div class="message-division">
	<div class="dash-message">
		<div class="user">
			<h4 class="user-message">${contactMessageArr[i].fname} ${contactMessageArr[i].sname}</h4>
		<h6 class="user-email">${contactMessageArr[i].email}</h6>
		</div>
		<p class="posted-image">
		${contactMessageArr[i].message}
		</p>
	</div>
  </div>
	`
}
messageContainer.innerHTML += message
