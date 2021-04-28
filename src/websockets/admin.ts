import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';

io.on('connect', async socket => {

  const connectionsService = new ConnectionsService();
  const openConnections = await connectionsService.listOpen();

  io.emit('list_of_open_connections', openConnections);
});