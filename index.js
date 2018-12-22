var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
__dirname = process.cwd();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/listen', function (req, res) {
  res.sendFile(__dirname + '/listen.html');
});

io.on('connection', function (socket) {
  console.log("A user connected.");
  socket.on('disconnect', function () {
    console.log('A user disconnected.');
  });
  socket.on('Registration Plate', function (reg) {
    io.emit('Registration Plate', reg);
  });
  socket.on('Vehicle Identification Number', function (vin) {
    io.emit('VIN', vin);
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});