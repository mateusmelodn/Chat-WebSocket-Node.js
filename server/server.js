var WebSocketServer = require('ws').Server;
var PORT = 8087;
var wss = new WebSocketServer({port: PORT});
var messages = [];

wss.on('connection', function (ws) {
	messages.forEach(function(message){
	ws.send(message);
	});

	ws.on('message', function (message) {
		messages.push(message);
		console.log('Message Received: %s', message);
		wss.clients.forEach(function (conn) {
			conn.send(message);
		});
	});

	ws.on('close', function (message) {
		messages.push(message);
		wss.clients.forEach(function (conn) {
			console.log('User disconnected: %s', conn.remoteAddress);
			conn.send(message);
		});
	});
});