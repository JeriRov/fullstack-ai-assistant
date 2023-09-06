import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as http from 'http';
import * as dotenv from 'dotenv';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import * as socketIo from 'socket.io';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'It works!',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const server = http.createServer(app);
const io = new socketIo.Server(server,  {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket)=>{
  console.log('socket is ready for connection');
  socket.on('joinRoom', () => {
    socket.emit('message', 'Welcome to application' + 'User!');
  });
});

export default server;
