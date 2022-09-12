//create a new WebSocket object.
var msgBox = $("#message-box");
var wsUri = "ws://localhost:9001/duckchat/server.php";
websocket = new WebSocket(wsUri);

websocket.onopen = function (ev) {
  // connection is open
  msgBox.append(
    '<div class="system_msg" style="color:#bbbbbb">BIENVENIDO A CHAT!</div>'
  ); //notify user
};
// Message received from server
websocket.onmessage = function (ev) {
  var response = JSON.parse(ev.data); //PHP sends Json data

  var res_type = response.type; //message type
  var user_message = response.message; //message text
  var user_name = response.name; //user name
  var user_color = response.color; //color

  switch (res_type) {
    case "usermsg":
      msgBox.append(
        '<div><span class="user_name" style="color:' +
          user_color +
          '">' +
          user_name +
          '</span> : <span class="user_message">' +
          user_message +
          "</span></div>"
      );
      break;
    case "system":
      msgBox.append('<div style="color:#bbbbbb">' + user_message + "</div>");
      break;
  }
  msgBox[0].scrollTop = msgBox[0].scrollHeight; //scroll message
};

websocket.onerror = function (ev) {
  msgBox.append(
    '<div class="system_error">Error Occurred - ' + ev.data + "</div>"
  );
};
websocket.onclose = function (ev) {
  msgBox.append('<div class="system_msg">Connection Closed</div>');
};

//Message send button
$("#send-message").click(function () {
  send_message();
});

//User hits enter key
$("#message").on("keydown", function (event) {
  if (event.which == 13) {
    send_message();
  }
});

//Send message
function send_message() {
  var message_input = $("#message"); //user message text
  var name_input = $("#name"); //user name

  if (message_input.val() == "") {
    //empty name?
    alert("Enter a name!");
    return;
  }
  if (message_input.val() == "") {
    //emtpy message?
    alert("Enter a message!");
    return;
  }

  //prepare json data
  var msg = {
    message: message_input.val(),
    name: name_input.val(),
    color: "<?php echo $colors[$color_pick]; ?>",
  };
  //convert and send data to server
  websocket.send(JSON.stringify(msg));
  message_input.val(""); //reset message input
}
