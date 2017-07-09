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
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'subham@example.com',
    text: 'Hi there!',
    createdAt: 123
  });

  socket.on('createMessage',(message) => {
    console.log('new meassge', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
