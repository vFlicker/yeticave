import { Server } from 'socket.io';

export const socket = (server) => {
  return new Server(server, {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET'],
    },
  });
};
