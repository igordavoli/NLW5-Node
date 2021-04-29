const socket = io();
let connections = [];


socket.on('list_of_open_connections', openConnections => {
  connections = openConnections;

  let list = document.getElementById('list_users');

  list.innerHTML = '';

  const template = document.getElementById('template').innerHTML;

  openConnections.forEach(connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socketId
    });

    list.innerHTML += rendered;
  })
});

function call(id) {
  const connection = connections.find(connection => connection.socketId === id);

  const template = document.getElementById('admin_template').innerHTML;

  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.userId,
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = { userId: connection.userId }

  socket.emit('list_user_messages_to_admin', params, messages => {
    const messagesDiv = document
      .getElementById(`allMessages${connection.userId}`);

    messages.forEach(message => {
      const createdDiv = document.createElement('div');

      if (message.adminId) {
        createdDiv.className = 'admin_message_admin';

        createdDiv.innerHTML = `Atendente:<span> ${message.text}</spam>`
        createdDiv.innerHTML +=
          `<span class="admin_date">${dayjs(message.createdAt)
            .format('DD/MM/YYYY HH:mm:ss')}</spam>`

      } else {
        createdDiv.className = 'admin_message_client';

        createdDiv.innerHTML = `<span>${connection.user.email}</spam>`
        createdDiv.innerHTML += `<span>${message.text}</spam>`
        createdDiv.innerHTML +=
          `<span class="admin_date">${dayjs(message.createdAt)
            .format('DD/MM/YYYY HH:mm:ss')}</spam>`
      }

      messagesDiv.appendChild(createdDiv);
    });
  });
}

function sendMessage(id) {
  const messageInput = document.getElementById(`send_message_${id}`);

  params = {
    text: messageInput.value,
    userId: id,
  }

  socket.emit('admin_send_message', params);
}
