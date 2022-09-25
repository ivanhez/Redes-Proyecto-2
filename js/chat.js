//create a new WebSocket object.
var msgBox = $("#message-box");
var wsUri = "ws://localhost:9001/Redes-Proyecto-2/server.php";
websocket = new WebSocket(wsUri);

var player;
var hand;
var turn;
var table;

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
  // console.log(user_message);
  if (user_message != null) {
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
        let game = JSON.parse(user_message).game;
        player = JSON.parse(user_message).player;
        turn = game.turn;
        order = game.order;
        table = game.table;
        hand = game.hand;
        if (player == document.getElementById("name").value) {
          document.getElementById("myhand").value = hand;
          document.getElementById("myorder").value = order;
          draw_hand(hand, turn);
        }
        // if (turn) {
        //   const index = hand.indexOf("3D");
        //   if (index > -1) {
        //     hand.splice(index, 1);
        //   }
        //   let game = {
        //     type: "game",
        //     message: {
        //       player: document.getElementById("name").value,
        //       room: document.getElementById("room").value,
        //       status: "PLAYING",
        //       table: table,
        //       order: order,
        //       action: "3D"
        //     },
        //     color: "<?php echo $colors[$color_pick]; ?>",
        //   };
        //   websocket.send(JSON.stringify(game));
        //   draw_hand(hand);
        // }
        break;
      case "update":
        draw_table(user_message.table);
        break;
      case "game":
        console.log(user_message);
        let gplayer = JSON.parse(user_message).player;
        let gturn = JSON.parse(user_message).turn;
        console.log(gplayer);
        console.log(document.getElementById("name").value);
        console.log(gturn);
        console.log(
          gplayer == document.getElementById("name").value && turn == true
        );
        if (gplayer == document.getElementById("name").value) {
          let myhand = document.getElementById("myhand").value;
          let hand = myhand.split(",");
          draw_hand(hand, true);
        }
        break;
    }
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
let mapsuit = { "♦": "D", "♣": "T", "♥": "C", "♠": "E" };

function select_card(cid) {
  let myhand = document.getElementById("myhand").value;
  let hand = myhand.split(",");
  let order = document.getElementById("myorder").value;
  id = cid.substring(1);
  nid = "n" + id;
  pid = "p" + id;
  number = document.getElementById(nid).textContent;
  suit = document.getElementById(pid).textContent;
  card = number + mapsuit[suit];
  let index = hand.indexOf(card);
  if (index > -1) {
    hand.splice(index, 1);
  }
  document.getElementById("myhand").value = hand;
  draw_hand(hand, false);
  let game = {
    type: "game",
    message: {
      player: document.getElementById("name").value,
      room: document.getElementById("room").value,
      status: "PLAYING",
      table: card,
      order: order,
      action: card,
      turn: false,
    },
    color: "<?php echo $colors[$color_pick]; ?>",
  };
  websocket.send(JSON.stringify(game));
}

function draw_table(table) {
  if (table.length == 2) {
    number = table[0];
    suit = table[1];
  } else {
    number = table[0] + table[1];
    suit = table[2];
  }
  ccolor = suit == "C" || suit == "D" ? "red" : "black";
  //  ♦ ♣ ♥ ♠
  document.getElementById("tn").textContent = number;
  document.getElementById("tp").style.color = ccolor;
  document.getElementById("tp").textContent = suitmap[suit];
  document.getElementById("table").hidden = false;
  document.getElementById("table").disabled = true;
}

function draw_hand(hand, turn) {
  for (let i = 1; i <= 13; i++) {
    cid = "c" + i;
    nid = "n" + i;
    pid = "p" + i;
    document.getElementById(cid).hidden = true;
    if (turn) {
      document.getElementById(cid).disabled = false;
    } else {
      document.getElementById(cid).disabled = true;
    }
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
