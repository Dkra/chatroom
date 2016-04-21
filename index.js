var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var userCount = 0;
app.get('/', function(req, res) {
  // send text
  // res.send(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});

// socketIO
io.on('connection', function(socket) {
  userCount++;
  console.log(`user connecting, ${userCount} user online`);

  // EVENT
  io.emit('chat message', 'new user coming to chat room!');

  // server broadcast
  socket.on('chat message', function(msg, name) {
    io.emit('chat message', msg, name);
  });

  // socket on disconnect
  socket.on('disconnect', function() {
    userCount--;
    console.log(`user disconnected, ${userCount} user still online`);
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
