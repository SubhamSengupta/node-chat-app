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
  socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to the Chat app'));
  socket.broadcast.emit('newUserConnected', generateMessage('Admin', 'New user connected'));

  socket.on('createMessage',(message) => {
    console.log('new meassge', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
