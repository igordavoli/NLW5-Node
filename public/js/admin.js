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

}