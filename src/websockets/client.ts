import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService;
  const messagesService = new MessagesService;
  const usersService = new UsersService;

  socket.on('client_first_access', async (params: IParams) => {
    const { text, email } = params;
    const user = await usersService.findOrCreate(email);
    const userId = user.id;
    const socketId = socket.id;

    await connectionsService.updateOrCreate({
      userId,
      socketId,
    });


    await messagesService.create({ userId, text });

    const messages = await messagesService.listByUser(userId);

    socket.emit('list_messages_client', messages);

    const openConnections = await connectionsService.listOpen();

    io.emit('list_open_connections', openConnections);
  });

  socket.on('send_message_to_admin', async params => {
    const { text, socketAdminId } = params;
    const socketId = socket.id;
    const { userId } = await connectionsService.findBySocketId(socketId);
    const message = await messagesService.create({ text, userId });
    const data = { message, socketId };

    io.to(socketAdminId).emit('client_message_admin', data);
  });


});