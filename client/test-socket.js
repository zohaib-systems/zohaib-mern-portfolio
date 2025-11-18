// Simple test client to validate Socket.IO server running on http://localhost:5000
const { io } = require('socket.io-client');

const SERVER = process.env.TEST_SOCKET_URL || 'http://localhost:5000';

const socket = io(SERVER, { reconnectionAttempts: 3, timeout: 5000 });

socket.on('connect', () => {
  console.log('connected ->', socket.id);
  // send a test message
  socket.emit('sendMessage', 'hello from test-socket.js');
});

socket.on('receiveMessage', (msg) => {
  console.log('received:', msg);
  // close after receiving an echo
  setTimeout(() => {
    socket.disconnect();
  }, 300);
});

socket.on('connect_error', (err) => {
  console.error('connect_error', err && err.message ? err.message : err);
  process.exitCode = 2;
});

socket.on('disconnect', (reason) => {
  console.log('disconnected:', reason);
  process.exit(0);
});
