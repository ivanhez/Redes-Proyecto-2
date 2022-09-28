<?php
// $host = 'localhost'; //host
$host = '68.183.111.216'; //host
$port = 9001; //port
$null = NULL; //null var
$deck = array(
	'"3D"',
	'"4D"',
	'"5D"',
	'"6D"',
	'"7D"',
	'"8D"',
	'"9D"',
	'"10D"',
	'"JD"',
	'"QD"',
	'"KD"',
	'"AD"',
	'"2D"',
	'"3T"',
	'"4T"',
	'"5T"',
	'"6T"',
	'"7T"',
	'"8T"',
	'"9T"',
	'"10T"',
	'"JT"',
	'"QT"',
	'"KT"',
	'"AT"',
	'"2T"',
	'"3C"',
	'"4C"',
	'"5C"',
	'"6C"',
	'"7C"',
	'"8C"',
	'"9C"',
	'"10C"',
	'"JC"',
	'"QC"',
	'"KC"',
	'"AC"',
	'"2C"',
	'"3E"',
	'"4E"',
	'"5E"',
	'"6E"',
	'"7E"',
	'"8E"',
	'"9E"',
	'"10E"',
	'"JE"',
	'"QE"',
	'"KE"',
	'"AE"',
	'"2E"'
);
$rooms = [];

//Create TCP/IP sream socket
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//reuseable port
socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1);

//bind socket to specified host
socket_bind($socket, 0, $port);

//listen to port
socket_listen($socket);

//create & add listning socket to the list
$clients = array($socket);

//start endless loop, so that our script doesn't stop
while (true) {
	//manage multiple connections
	$changed = $clients;
	//returns the socket resources in $changed array
	socket_select($changed, $null, $null, 0, 10);

	//check for new socket
	if (in_array($socket, $changed)) {
		$socket_new = socket_accept($socket); //accpet new socket
		$clients[] = $socket_new; //add socket to client array

		$header = socket_read($socket_new, 1024); //read data sent by the socket
		perform_handshaking($header, $socket_new, $host, $port); //perform websocket handshake

		socket_getpeername($socket_new, $ip); //get ip address of connected socket
		// $response = mask(json_encode(array('type' => 'system', 'message' => $ip . ' connected'))); //prepare json data
		// send_message($response); //notify all users about new connection

		//make room for new socket
		$found_socket = array_search($socket, $changed);
		unset($changed[$found_socket]);
	}

	//loop through all connected sockets
	foreach ($changed as $changed_socket) {

		//check for any incomming data
		while (socket_recv($changed_socket, $buf, 1024, 0) >= 1) {
			$received_text = unmask($buf); //unmask data
			$tst_msg = json_decode($received_text, true); //json decode 
			$type = $tst_msg['type']; //type

			switch ($type) {
				case 'chat':
					$user_name = $tst_msg['name']; //sender name
					$user_message = $tst_msg['message']; //message text
					$user_color = $tst_msg['color']; //color
					//prepare data to be sent to client
					$response_text = mask(json_encode(array('type' => 'usermsg', 'room' => $tst_msg['room'], 'name' => $user_name, 'message' => $user_message, 'color' => $user_color)));
					send_message($response_text); //send data
					break;
				case 'start':
					$tst_msg = $tst_msg['message']; //json decode 
					$player = $tst_msg['player'];
					$room = $tst_msg['room'];
					$status = $tst_msg['status'];
					$roomnames = array();
					foreach ($rooms as $key => $val) {
						array_push($roomnames, $val[$key]['room']);
					}
					if (in_array($room, $roomnames)) {
						join_room($room, $player);
					} else {
						create_room($room, $deck);
						join_room($room, $player);
					}


					break;
				case 'game':
					$tst_msg = $tst_msg['message'];
					$order = $tst_msg['order'];
					$status = $tst_msg['status'];
					$serversays = mask(json_encode(array('type' => 'update', 'message' => $tst_msg)));
					send_message($serversays);
					if ($status != "WIN") {
						$room = $tst_msg['room'];
						$status = $tst_msg['status'];
						$order = $tst_msg['order'];
						$action = $tst_msg['action'];
						$table = $tst_msg['table'];
						$top = $tst_msg['top'];
						$order = intval($order) + 1;
						$order = ($order >= 5) ? 1 : $order;
						foreach ($rooms as &$val) {
							if ($val[0]['room'] == $room) {
								$player = $val[0]['players'][$order - 1];
							}
						}
						$next = '{
							"player": "' . $player . '",
							"top": "' . $top . '",
							"room": "' . $room . '",
							"status": "PLAYING",
							"order": ' . $order . ',
							"table": "' . $table . '",
							"turn": true
						}';
						$serversays = mask(json_encode(array('type' => 'game', 'message' => $next)));
						send_message($serversays);
					} else {
						foreach ($rooms[0] as $key => &$val) {
							if ($val['room'] == $room) {
								unset($rooms[0][$key]);
							}
						}
						unset($val);
					}
					break;
			}

			break 2; //exist this loop
		}

		$buf = @socket_read($changed_socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			// remove client for $clients array
			$found_socket = array_search($changed_socket, $clients);
			socket_getpeername($changed_socket, $ip);
			unset($clients[$found_socket]);

			//notify all users about disconnected connection
			$response = mask(json_encode(array('type' => 'system', 'message' => $ip . ' disconnected')));
			send_message($response);
		}
	}
}
// close the listening socket
socket_close($socket);

function join_room($room, $player)
{
	global $rooms;
	foreach ($rooms as &$val) {
		if ($val[0]['room'] == $room) {
			$players = $val[0]['players'];
			if (count($players) <= 4) {
				if (!in_array($player, $players)) {
					array_push($players, $player);
					$val[0]['players'] = $players;
					$order = count($players);
					$startmsg = $player . " IS CONNECTING TO " . $room . " CURRENT PLAYERS IN ROOM: " . implode(", ", $players);
					$serversays = mask(json_encode(array('type' => 'system', 'message' => $startmsg)));
					send_message($serversays);
					$ddeck = $val[0]['deck'];
					$hand = array_slice($ddeck, 0, 13);
					$val[0]['deck'] = array_slice($ddeck, 13, sizeof($ddeck));
					if (in_array('"3D"', $hand) == 1) {
						$joingame = '{
							"player": "' . $player . '",
							"room": "' . $room . '",
							"status": "PLAYING",
							"game": {
								"order": ' . $order . ',
								"turn": true,
								"table": "0",
								"hand": [' . implode(", ", $hand) . '],
								"action": "TURN"
							}
						}';
						$serversays = mask(json_encode(array('type' => 'start', 'message' => $joingame)));
						send_message($serversays);
					} else {
						$joingame = '{
							"player": "' . $player . '",
							"room": "' . $room . '",
							"status": "PLAYING",
							"game": {
								"order": ' . $order . ',
								"turn": false,
								"table": "0",
								"hand": [' . implode(", ", $hand) . '],
								"action": "WAIT"
							}
						}';
						$serversays = mask(json_encode(array('type' => 'start', 'message' => $joingame)));
						send_message($serversays);
					}
				} else {
					echo "ERROR PLAYER ALREADY EXISTS";
					send_message(mask(json_encode(array('type' => 'error', 'message' => "ERROR PLAYER ALREADY EXISTS"))));
				}
			} else {
				echo "ERROR MAX PLAYERS";
				send_message(mask(json_encode(array('type' => 'error', 'message' => "ERROR MAX PLAYERS"))));
			}
		}
	}
	return;
}
function create_room($room, $deck)
{
	global $rooms;
	shuffle($deck);
	// $newroom = '{"room": "' . $room . '", "players": [], "table": "0", "deck": [' . implode(", ", $deck) . ']}';
	$newroom = array(
		array(
			"room" => $room,
			"players" => [],
			"table" => "0",
			"deck" => $deck
		)
	);
	array_push($rooms, $newroom);
	// $msg = "CREATED NEW ROOM " . $room;
	// send_message(mask(json_encode(array('type' => 'system', 'message' => $msg))));
	return;
}

function send_message($msg)
{
	global $clients;
	foreach ($clients as $changed_socket) {
		@socket_write($changed_socket, $msg, strlen($msg));
	}
	return true;
}


//Unmask incoming framed message
function unmask($text)
{
	$length = ord($text[1]) & 127;
	if ($length == 126) {
		$masks = substr($text, 4, 4);
		$data = substr($text, 8);
	} elseif ($length == 127) {
		$masks = substr($text, 10, 4);
		$data = substr($text, 14);
	} else {
		$masks = substr($text, 2, 4);
		$data = substr($text, 6);
	}
	$text = "";
	for ($i = 0; $i < strlen($data); ++$i) {
		$text .= $data[$i] ^ $masks[$i % 4];
	}
	return $text;
}

//Encode message for transfer to client.
function mask($text)
{
	$b1 = 0x80 | (0x1 & 0x0f);
	$length = strlen($text);

	if ($length <= 125)
		$header = pack('CC', $b1, $length);
	elseif ($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
	elseif ($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
	return $header . $text;
}

//handshake new client.
function perform_handshaking($receved_header, $client_conn, $host, $port)
{
	$headers = array();
	$lines = preg_split("/\r\n/", $receved_header);
	foreach ($lines as $line) {
		$line = chop($line);
		if (preg_match('/\A(\S+): (.*)\z/', $line, $matches)) {
			$headers[$matches[1]] = $matches[2];
		}
	}

	$secKey = $headers['Sec-WebSocket-Key'];
	$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
	//hand shaking header
	$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
		"Upgrade: websocket\r\n" .
		"Connection: Upgrade\r\n" .
		"WebSocket-Origin: $host\r\n" .
		"WebSocket-Location: ws://$host:$port\r\n" .
		"Sec-WebSocket-Version: 13\r\n" .
		"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
		"Sec-WebSocket-Version: 13\r\n" .
		"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
	socket_write($client_conn, $upgrade, strlen($upgrade));
}
