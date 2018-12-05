var url = "ws://localhost:8087/";
var user;
var socket;

function connectToChat() {
	socket = new WebSocket(url);
	user = document.getElementById("name").value;

	socket.onmessage = function (msg) {
		var chatBox = document.getElementById("chatBox");
		var message = JSON.parse(msg.data);
		chatBox.innerHTML = "(" + getDateTime() + ")<b> " + message.from + "</b> para <b>Todos</b>: " + message.text + "<br>" + chatBox.innerHTML;
	};

	socket.onopen = function () {
		var message = {};
		message.from = user;
		message.text = "<b> acabou de entrar no chat.</b>";
		socket.send(JSON.stringify(message));
	};

	document.getElementById("chat").setAttribute("style", "");
	document.getElementById("welcome").setAttribute("style", "display:none");
}

function sendMessage() {
	var message = {};
	message.from = user;
	message.text = document.getElementById("message").value;
	socket.send(JSON.stringify(message));
	document.getElementById("message").value = "";
}

window.onload = function () {
	document.getElementById("chat").setAttribute("style", "display:none");
}

var input = document.getElementById("name");
input.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("name-btn").click();
	}
});

var input = document.getElementById("message");
input.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		document.getElementById("message-btn").click();
	}
});

function getDateTime() {
	var date = new Date();
	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;
	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	return year + "/" + month + "/" + day + " às " + hour + ":" + min + ":" + sec;
}