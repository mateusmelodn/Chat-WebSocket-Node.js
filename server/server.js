//---------------------------------------- BROADCAST ----------------------------------------
var WebSocketServer = require('ws').Server;
var PORT = 8087;
var wss = new WebSocketServer({port: PORT});
var messages = [];


console.log('Broadcast ligado em %s', PORT);
wss.on('connection', function (ws) {
	messages.forEach(function(message) {
		ws.send(message);
	});

	ws.on('message', function (message) {
		messages.push(message);
		console.log('Mensagem recebida: %s', message);
		wss.clients.forEach(function (conn) {
			conn.send(message);
		});
	});

	/*ws.on('close', function (message) {
		messages.push(message);
		console.log('Usuário desconectado: %s', message);

		wss.clients.forEach(function (conn) {
			conn.send(message);
		});
	});*/
});
