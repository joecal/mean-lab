var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var $ = require('jquery')(require("jsdom").jsdom().defaultView);

var UserId = mongoose.model("UserId", new mongoose.Schema({
  socketId: String
}));

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URL);
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

    var usersPresent = io.engine.clientsCount;

    console.log(io.engine.clientsCount);

    console.log("We have a new client: " + socket.id);

    socket.on('mouse',
      function(data) {
        // console.log("Received: 'mouse' " + data.x + " " + data.y);
        socket.broadcast.emit('mouse', data);
      }
    );

    socket.on('disconnect', function(){
      UserId.find({}).remove().exec();
      // UserId.findOneAndRemove({socketId: socket.id}).remove().exec();
      console.log("Client has disconnected");
    });
  }
);
