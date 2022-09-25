//create a new WebSocket object.
var msgBox = $("#message-box");
var wsUri = "wss://cartas-13-kc433.ondigitalocean.app:9001/server.php";
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
        let game = JSON.parse(user_message).game;
        player = JSON.parse(user_message).player;
        turn = game.turn;
        order = game.order;
        table = game.table;
        hand = game.hand;
        if (player == document.getElementById("name").value) {
          document.getElementById("myhand").value = hand;
          document.getElementById("myorder").value = order;
          document.getElementById("tn").textContent = table;
          draw_hand(hand, turn);
          document.getElementById("passb").removeAttribute("hidden");
        }
        break;
      case "update":
        if (user_message.status == "WIN") {
          draw_table(user_message.table);
          msgBox.append(
            '<div class="system_msg">' + user_message.player + " WINS</div>"
          );
        } else {
          draw_table(user_message.table);
        }
        break;
      case "game":
        let gplayer = JSON.parse(user_message).player;
        let tplayer = JSON.parse(user_message).top;
        document.getElementById("top").value = tplayer;
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
let suitnum = { D: 1, T: 2, C: 3, E: 4 };
let numnum = {
  0: 1,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
  2: 15,
};
function check_card(number, suit) {
  let tnumber = document.getElementById("tn").textContent;
  let tsuit = document.getElementById("tp").textContent;

  console.log(number);
  console.log(tnumber);
  number = numnum[number];
  tnumber = numnum[tnumber];
  console.log(number);
  console.log(tnumber);

  tsuit = mapsuit[tsuit];
  tsuit = parseInt(suitnum[tsuit]);
  suit = parseInt(suitnum[suit]);
  if (
    document.getElementById("top").value ==
    document.getElementById("name").value
  ) {
    tnumber = 0;
  }
  if (number > tnumber) {
    return true;
  } else if (number == tnumber) {
    if (suit > tsuit) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
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
  if (check_card(number, mapsuit[suit])) {
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
        top: document.getElementById("name").value,
      },
      color: "<?php echo $colors[$color_pick]; ?>",
    };

    let index = hand.indexOf(card);
    if (index > -1) {
      hand.splice(index, 1);
    }
    document.getElementById("myhand").value = hand;
    draw_hand(hand, false);
    if (hand.length == 0) {
      game.message.status = "WIN";
      websocket.send(JSON.stringify(game));
    } else {
      websocket.send(JSON.stringify(game));
    }
  } else {
    alert("INVALID CARD! SELECT ANOTHER CARD!!");
  }
}

function pass() {
  let myhand = document.getElementById("myhand").value;
  let hand = myhand.split(",");
  let order = document.getElementById("myorder").value;
  let tn = document.getElementById("tn").textContent;
  let tp = document.getElementById("tp").textContent;
  card = tn + mapsuit[tp];
  let game = {
    type: "game",
    message: {
      player: document.getElementById("name").value,
      room: document.getElementById("room").value,
      status: "PLAYING",
      table: card,
      order: order,
      action: "PASS",
      turn: false,
      top: document.getElementById("top").value,
    },
    color: "<?php echo $colors[$color_pick]; ?>",
  };
  websocket.send(JSON.stringify(game));
  draw_hand(hand, false);
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
      document.getElementById("passb").disabled = false;
    } else {
      document.getElementById(cid).disabled = true;
      document.getElementById("passb").disabled = true;
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
