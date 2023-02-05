const token = JSON.parse(localStorage.getItem('token'))
const messagesContainer = document.querySelector('.messages-whole-container');
fetch(
  `https://important-suit-tuna.cyclic.app/api/v1/messages/all`,
  {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((messages) => {
    console.log(token);
    console.log(messages);
    const allMessages = messages.data;
    console.log(allMessages);
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
              </div>
            </div>`;
    });
  })
  .catch((err) => {
    console.log(err);
  });
