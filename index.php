<?php
$colors = array('#007AFF', '#FF7000', '#FF7000', '#15E25F', '#CFC700', '#CFC700', '#CF1100', '#CF00BE', '#F00');
$color_pick = array_rand($colors);
?>

<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/main.css" type="text/css">

</head>

<body>
	<div class="chat-wrapper">
		<div id="message-box"></div>
		<div class="user-panel">
			<input type="hidden" name="room" id="room" maxlength="15" value="" disabled />
			<input type="text" name="name" id="name" maxlength="15" value="" disabled />
			<input type="text" name="message" id="message" placeholder="Type your message here..." maxlength="100" />
			<button id="send-message">Send</button>
		</div>
	</div>
	<div id="hand">
		<input type="hidden" id="myhand">
		<input type="hidden" id="myorder">
		<input type="hidden" id="top">
		<button onclick="select_card(this.id)" style="width:35px" id="c1" hidden>
			<div id="n1">A</div>
			<div id="p1" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c2" hidden>
			<div id="n2">A</div>
			<div id="p2" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c3" hidden>
			<div id="n3">A</div>
			<div id="p3" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c4" hidden>
			<div id="n4">A</div>
			<div id="p4" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c5" hidden>
			<div id="n5">A</div>
			<div id="p5" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c6" hidden>
			<div id="n6">A</div>
			<div id="p6" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c7" hidden>
			<div id="n7">A</div>
			<div id="p7" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c8" hidden>
			<div id="n8">A</div>
			<div id="p8" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c9" hidden>
			<div id="n9">A</div>
			<div id="p9" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c10" hidden>
			<div id="n10">A</div>
			<div id="p10" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c11" hidden>
			<div id="n11">A</div>
			<div id="p11" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c12" hidden>
			<div id="n12">A</div>
			<div id="p12" style="color:red">♥</div>
		</button>
		<button onclick="select_card(this.id)" style="width:35px" id="c13" hidden>
			<div id="n13">A</div>
			<div id="p13" style="color:red">♥</div>
		</button>
		<button onclick="pass()" style="width:50px" id="passb" hidden>
			PASS
		</button>
	</div>
	<br>TABLE CARD<br>
	<button style=" width:35px" id="table" hidden>
		<div id="tn"></div>
		<div id="tp" style="color:red"></div>
	</button>
	<script>
		function login() {
			let person = prompt("Please enter your name:");
			if (person == null || person == "") {
				login();
			} else {
				let room = prompt("Please enter a room to join:");
				if (room == null || room == "") {
					login();
				} else {
					document.getElementById("name").value = person;
					document.getElementById("room").value = room;
				}
			}
		}
		login();
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/chat.js"></script>
	</script>
</body>
<div><br><br>
	REGLAS<br>
	<br>Se inica el juego con cuatro jugadores, cada uno recibe 13 cartas.
	<br>La persona con la carta más baja, el 3 de diamantes, es la persona que va primero.
	<br>Se inica colocando una carta y cada jugador puede jugar una carta sola.
	<br>Pasa si no puedes colocar una carta más alta sobre la mesa y el turno pasará a la siguiente persona.
	<br>Una vez que pases, no puedes jugar otra carta hasta que la ronda termine.
	<br>Si todos pasan, la última persona que jugó la carta más alta puede jugar la carta que quiera.
	<br>El objetivo es jugar una carta que le gane a la carta anterior en la mesa hasta deshacerte de todas tus cartas.
	<br>Se juega colocando una carta, más alta que la que está sobre la mesa.
	<br>Las cartas van de la más alta a la más baja en este orden: 2, A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3.
	<br>El palo más alto es el de espadas, seguido de los corazones, los tréboles y los diamantes el más bajo.
	<br>Esta regla se aplica para la carta del mismo número. Por ejemplo, un 2 de corazones le gana a un 2 de diamantes.
	<br>El 3 de diamantes es la carta más baja en este juego.
	<br>El 2 de espadas es la más alta.
</div>
</html>