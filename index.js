var express = require("express");
var socket = require("socket.io");

// App setup
var app = express();
var server = app.listen(process.env.PORT || 4000, function() {
  console.log("listening for requests on port 4000,");
});

// Static files
app.use(express.static("public"));

// Socket setup & pass server
var io = socket(server);

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  require("getmac").getMac(function(err, macAddress) {
    if (err) throw err;
    console.log(macAddress);
  });

  socket.on("disconnect", function(data) {
    handle.filter(elem => {
      elem !== data.handle;
    });

    console.log(data.handle);
  });

  socket.on("type", function(data) {
    socket.broadcast.emit("type", data);
  });

  // Handle chat event
  socket.on("chat", function(data) {
    // console.log(data);
    if (handle.includes(data.handle)) {
      return data.handle;
    } else {
      handle.push(data.handle);
    }
    data.onlineUsers = count++;
    io.sockets.emit("chat", data);
  });
});
