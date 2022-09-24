//create a new WebSocket object.
var msgBox = $("#message-box");
var wsUri = "ws://localhost:9001/Redes-Proyecto-2/server.php";
websocket = new WebSocket(wsUri);

websocket.onopen = function (ev) {
  // connection is open
  // msgBox.append(
  //   '<div class="system_msg" style="color:#bbbbbb">BIENVENIDO A CHAT!</div>'
  // ); //notify user
  var start = {
    type: "start",
    message: {
      player: document.getElementById("name").value,
      room: document.getElementById("room").value,
      status: "START",
      game: {},
    },
    color: "<?php echo $colors[$color_pick]; ?>",
  };
  //convert and send data to server
  websocket.send(JSON.stringify(start));
};
// Message received from server
websocket.onmessage = function (ev) {
  var response = JSON.parse(ev.data); //PHP sends Json data
  var res_type = response.type; //message type
  var user_message = response.message; //message text
  // console.log(response);
  switch (res_type) {
    case "usermsg":
      var user_name = response.name; //user name
      var user_color = response.color; //color
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
    case "start":
      // console.log(user_message);
      var game = JSON.parse(user_message).game;
      var player = JSON.parse(user_message).player;
      var action = game.action;
      var turn = game.turn;
      var order = game.order;
      var table = game.table;
      var hand = game.hand;
      draw_hand(hand);
      if (turn) {
        const index = hand.indexOf("3D");
        if (index > -1) {
          hand.splice(index, 1);
        }
        let game = {
          type: "game",
          message: {
            player: document.getElementById("name").value,
            room: document.getElementById("room").value,
            status: "PLAYING",
            game: {
              order: order,
              turn: false,
              table: table,
              hand: hand,
              action: "3D",
            },
          },
          color: "<?php echo $colors[$color_pick]; ?>",
        };
        websocket.send(JSON.stringify(game));
        draw_hand(hand);
      }
      break;
    case "game":
      console.log(user_message);
      var game = JSON.parse(user_message).game;
      var player = JSON.parse(user_message).player;
      var action = game.action;
      var turn = game.turn;
      var order = game.order;
      var table = game.table;
      var hand = game.hand;
      if (turn) {
        
      }
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

  if (name_input.val() == "") {
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
    type: "chat",
    message: message_input.val(),
    name: name_input.val(),
    color: "<?php echo $colors[$color_pick]; ?>",
  };
  //convert and send data to server
  websocket.send(JSON.stringify(msg));
  message_input.val(""); //reset message input
}

let suitmap = { D: "♦", T: "♣", C: "♥", E: "♠" };
function draw_hand(hand) {
  for (let i = 1; i <= 13; i++) {
    cid = "c" + i;
    nid = "n" + i;
    pid = "p" + i;
    document.getElementById(cid).hidden = true;
  }
  for (let i = 1; i <= hand.length; i++) {
    card = hand[i - 1];
    if (card.length == 2) {
      number = card[0];
      suit = card[1];
    } else {
      number = card[0] + card[1];
      suit = card[2];
    }
    cid = "c" + i;
    nid = "n" + i;
    pid = "p" + i;
    ccolor = suit == "C" || suit == "D" ? "red" : "black";
    //  ♦ ♣ ♥ ♠
    document.getElementById(cid).removeAttribute("hidden");
    document.getElementById(nid).textContent = number;
    document.getElementById(pid).style.color = ccolor;
    document.getElementById(pid).textContent = suitmap[suit];
  }
}
