var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');


var app = express();

app.configure(function (){
    app.set('port', process.env.PORT || 5000);

    app.use(express.static(path.join(__dirname, '')));
});


var server = http.createServer(app).listen(app.get('port'), function(request, response){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);
 
io.sockets.on('connection', function(socket) { 
    socket.on('player_connect', function(data) {
        console.log('player_connect');
        //add player with name
        // #player > 1 -> don't allow new players

    }); 

    socket.on('gamepad_message', function(data) {
        console.log("gamepad_message", data);
        socket.broadcast.emit("gamepad_command", data); 
    });
});