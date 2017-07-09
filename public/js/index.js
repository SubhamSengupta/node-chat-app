var socket = io();
socket.on('connect', function () {
  console.log("connected to the server");
});

socket.on('disconnect', function () {
  console.log("disconnected from the server");
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
    console.log('Cannot send message');
  });
});

jQuery('#send-location').on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation is not suppoprted by the browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('sendLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function (){
    console.log('unable to fetch data');
  });
});
