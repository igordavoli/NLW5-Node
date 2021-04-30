import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async socket => {

  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const openConnections = await connectionsService.listOpen();

  io.emit('list_open_connections', openConnections);

  socket.on('list_user_messages_to_admin', async ({ userId }, callback) => {

    const messages = await messagesService.listByUser(userId);

    callback(messages);
  })

  socket.on('admin_engaged', async params => {
    const { userId } = params;
    const adminId = socket.id;

    await connectionsService.updateAdminId(userId, adminId);

    const openConnections = await connectionsService.listOpen();

    io.emit('list_open_connections', openConnections);
  });

  socket.on('admin_send_message', async params => {
    const { text, userId } = params;
    const newMessage = {
      text,
      userId,
      adminId: socket.id,
    };

    await messagesService.create(newMessage);

    const { socketId } = await connectionsService.findByUserId(userId);

    io.to(socketId).emit('send_message_to_client', {
      text,
      socketId: socket.id,
    });
  })
});

