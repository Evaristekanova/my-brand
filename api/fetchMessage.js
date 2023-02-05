const messagesContainer = document.querySelector('.messages-whole-container');
fetch(
  `https://important-suit-tuna.cyclic.app/api/v1/messages/all`,
  { mode: 'cors' },
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`,
    },
  }
)
  .then((res) => res.json())
  .then((messages) => {
    console.log(localStorage.getItem('token'));
    console.log(messages);
    const allMessages = messages.data;
    allMessages.forEach((el) => {
      messagesContainer.innerHTML += `
        <div class="message-division">
              <div class="dash-message">
                <div class="user">
                  <h4 class="user-message">Kanova</h4>
                  <h6 class="user-email">kanova@gmail.com</h6>
                </div>
                <p class="posted-image">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>`;
    });
  })
  .catch((err) => {
    console.log(err);
  });
