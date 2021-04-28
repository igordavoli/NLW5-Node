document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

  socket.on('connect', () => {
    const params = { email, text };

    socket.emit('client_first_access', params, (call, err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(call);
      }
    });
  });

  socket.on('list_messages_client', messages => {
    const userTemplate = document.getElementById('message-user-template').innerHTML;
    const adminTemplate = document.getElementById('admin-template').innerHTML;
    messages.forEach(message => {
      if (message.adminId) {
        const rendered = Mustache.render(adminTemplate, {
          messageAdmin: message.text
        })
        document.getElementById('messages').innerHTML += rendered;
      } else {
        const rendered = Mustache.render(userTemplate, {
          message: message.text,
          email
        });

        document.getElementById('messages').innerHTML += rendered;
      }
    })
  });
});
