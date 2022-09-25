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

</html>