import express, { json } from 'express';
import './database';
import { routes } from './routes';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('socket id:', socket.id);
});

app.use(json());
app.use(routes);

export { http, io };