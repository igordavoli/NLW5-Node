import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async socket => {

  const connectionsService = new ConnectionsService();
  const openConnections = await connectionsService.listOpen();

  io.emit('list_of_open_connections', openConnections);

  socket.on('list_user_messages_to_admin', async ({ userId }, callback) => {
    const messagesService = new MessagesService();

    const messages = await messagesService.listByUser(userId);

    callback(messages);
  })
});

