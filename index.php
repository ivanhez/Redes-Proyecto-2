<?php
$colors = array('#007AFF', '#FF7000', '#FF7000', '#15E25F', '#CFC700', '#CFC700', '#CF1100', '#CF00BE', '#F00');
$color_pick = array_rand($colors);
?>

<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/main.css" type="text/css">
	<script type="text/javascript" src="js/chat.js"></script>
</head>

<body>
	<div class="chat-wrapper">
		<div id="message-box"></div>
		<div class="user-panel">
			<input type="text" name="name" id="name" placeholder="Your Name" maxlength="15" />
			<input type="text" name="message" id="message" placeholder="Type your message here..." maxlength="100" />
			<button id="send-message">Send</button>
		</div>
	</div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script language="javascript" type="text/javascript">

	</script>
</body>

</html>