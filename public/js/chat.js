let socketAdminId = null;
let userEmail = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io();

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value;
  userEmail = email;

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

  socket.on('send_message_to_client', message => {
    socketAdminId = message.socketId;

    const adminTemplate = document.getElementById('admin-template').innerHTML;

    const rendered = Mustache.render(adminTemplate, {
      messageAdmin: message.text,
    });

    document.getElementById('messages').innerHTML += rendered

  });
});

document.getElementById('send_message_button').addEventListener('click', event => {
  const messageInput = document.getElementById('message_user');

  const params = {
    text: messageInput.value,
    socketAdminId,
  };

  socket.emit('send_message_to_admin', params);

  const clientTemplate = document.getElementById('message-user-template').innerHTML;

  const rendered = Mustache.render(clientTemplate, {
    message: messageInput.value,
    email: userEmail,
  });

  document.getElementById('messages').innerHTML += rendered;

  messageInput.value = '';
});
