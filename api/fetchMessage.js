const preloader = document.getElementById('preloader');
const wholeContainer = document.querySelector('.whole-cont');
const token = JSON.parse(localStorage.getItem('token'));
const messagesContainer = document.querySelector('.messages-whole-container');
wholeContainer.style.display = 'none';
preloader.style.display = 'block';
fetch(`https://important-suit-tuna.cyclic.app/api/v1/messages/all`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((messages) => {
    const allMessages = messages.data;
    allMessages.forEach((el) => {
      messagesContainer.innerHTML += `
        <div class="message-division">
              <div class="dash-message">
                <div class="user">
                  <h4 class="user-message">${el.firstName} ${el.secondName}</h4>
                  <h6 class="user-email">${el.email}</h6>
                </div>
                <p class="posted-image">
                  ${el.messages}
                </p>
            <button class="btn dlt-btn"">delete</button>
              </div>
            </div>`;
    });
    preloader.style.display = 'none';
    wholeContainer.style.display = 'block';
  })
  .catch((err) => {
    console.log(err);
  });
