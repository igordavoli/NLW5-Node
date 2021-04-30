const socket = io();
let connections = [];


socket.on('list_open_connections', openConnections => {
  connections = openConnections;

  let connectionsList = document.getElementById('list_users');

  connectionsList.innerHTML = '';

  const template = document.getElementById('template').innerHTML;

  openConnections.forEach(connection => {
    const rendered = Mustache.render(template, {
      email: connection.user.email,
      id: connection.socketId
    });

    connectionsList.innerHTML += rendered;
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

  socket.emit('admin_engaged', params);

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

  const messagesDiv = document.getElementById(`allMessages${id}`);

  const createdDiv = document.createElement('div');

  createdDiv.className = 'admin_message_admin';
  createdDiv.innerHTML = `Atendente:<span> ${params.text}</spam>`;
  createdDiv.innerHTML += `<span class="admin_date">${dayjs()
    .format('DD/MM/YYYY HH:mm:ss')}</spam>`;

  messagesDiv.appendChild(createdDiv);

  messageInput.value = '';
}
socket.on('client_message_admin', params => {
  const { socketId, message } = params;
  const connection = connections.find(connection => connection.socketId === socketId);
  const messagesDiv = document
    .getElementById(`allMessages${connection.userId}`);

  const createdDiv = document.createElement('div');
  createdDiv.className = 'admin_message_client';


  createdDiv.innerHTML = `<span>${connection.user.email}</spam>`
  createdDiv.innerHTML += `<span>${message.text}</spam>`
  createdDiv.innerHTML +=
    `<span class="admin_date">${dayjs(message.createdAt)
      .format('DD/MM/YYYY HH:mm:ss')}</spam>`

  messagesDiv.appendChild(createdDiv);
});


// function updateScroll(){
//   var element = document.getElementById("yourDivID");
//   element.scrollTop = element.scrollHeight;
// }