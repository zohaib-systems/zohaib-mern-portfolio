const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const morgan = require('morgan');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const Message = require('./models/Message');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🚀 MongoDB Connected Successfully!'))
  .catch(err => console.log('DB Error:', err));

app.get('/', (req, res) => {
  res.send('<h1>ZOHAIB ALI – MERN Backend Live from GitHub 🔥</h1>');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', async (msg) => {
    try {
      // msg can be { text, sender }
      const saved = await Message.create({ text: msg.text || msg, sender: msg.sender || 'Guest' });
      io.emit('receiveMessage', { id: saved._id, text: saved.text, sender: saved.sender, createdAt: saved.createdAt });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

const PORT = process.env.PORT || 5000;
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

// error handler
app.use(errorHandler);

server.listen(PORT, () => console.log(`Backend + Chat running on port ${PORT}`));