const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
  socket.emit('welcomeMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newUserConnected', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage',(message) => {
    console.log('new meassge', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
