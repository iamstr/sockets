// Make connection
var socket = io.connect(new URL(document.location).host);

// Query DOM
var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");
handle.addEventListener("click", function() {
  if (handle.value !== "") {
    handle.disabled = true;
  }
});

message.addEventListener("keyup", function(event) {
  let x = event.which || event.keyCode;
  event.preventDefault();
  if (event.which === 13 || event.keyCode === 13) {
    // alert('enter pressed')
    socket.emit("chat", {
      message: message.value,
      handle: handle.value
    });
    message.value = "";
  }
});

// Emit events
btn.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  message.value = "";
});

// Listen for events
socket.on("chat", function(data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  feedback.innerHTML = "";
});

message.addEventListener("keyup", function() {
  socket.emit("type", { handle: handle.value });
});

socket.on("type", function(data) {
  feedback.innerHTML = `${data.handle} is typing ...`;
});
