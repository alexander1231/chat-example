var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/tucutin.mp3', function(req, res){
  res.sendFile(__dirname + '/tucutin.mp3');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
      // io.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
