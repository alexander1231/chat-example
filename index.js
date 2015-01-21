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

	var cont = 0;
	var last = null;
	var banned = false;

	var trollMessage = {
		isBot: true,
		user: 'Pulpin Bot',
		msg: 'XUPALA LENTO! ... baneado por 10 seg'
	}

  socket.on('chat message', function(msg){

      var now = Date.now();

      if(banned){
      	if(now - bannedTime > 10000)
      		banned = false
      }

      if(cont == 1) {
      	last = now

      } else {

      	if (now - last < 500) {
      		// spam
      		banned = true;
      		bannedTime = now;
      		socket.emit('chat message', trollMessage);

      	} else {
      		// valido
      		// console.log('valido')
      		last = Date.now();
      	}
      }

      if(!banned)
      	socket.broadcast.emit('chat message', msg);
  });
});


var port = Number(process.env.PORT || 3000)

http.listen(port, function(){
  console.log('listening on *:3000');
});
