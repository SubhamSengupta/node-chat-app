var socket = io();
socket.on('connect', function () {
  console.log("connected to the server");
});

socket.on('disconnect', function () {
  console.log("disconnected from the server");
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
socket.on('newUserConnected', function (message) {
  console.log('Admin', message);
});
socket.on('welcomeMessage', function (message) {
  console.log('Admin:', message);
});
