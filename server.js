var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');

var UserId = mongoose.model("UserId", new mongoose.Schema({
  socketId: String
}));

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect("mongodb://localhost/draw");
}

app.get("/api/users", function (req, res) {
  UserId.find({}).lean().exec().then(function (users) {
    res.json(users);
  })
})

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',

  function (socket) {

    if (socket) UserId.create({socketId: socket.id});

    console.log("We have a new client: " + socket.id);

    socket.on('mouse',
      function(data) {
        // console.log("Received: 'mouse' " + data.x + " " + data.y);
        socket.broadcast.emit('mouse', data);
      }
    );

    socket.on('disconnect', function(){
      UserId.findOne({socketId: socket.id}).remove().exec();
      console.log("Client has disconnected");
    });
  }
);
