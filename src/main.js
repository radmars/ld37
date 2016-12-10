"use strict"


String.prototype.escapeHTML = function() {
	var __entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};

	return String(this).replace(/[&<>"'\/]/g, function (s) {
		return __entityMap[s];
	});
}

var user_index = 0

var User = function(name, status) {
	this.id = user_index++
	this.name = "RandomMook" + this.id
	this.status = ' ';
}

User.prototype.op = function() {
	this.status = '@'
}

var Room = function() {
	this.users = []
	this.messages = [];
}

Room.prototype.addMessage = function(user, message) {
	this.messages.push({
		user: user,
		message: message,
	});
	var area = $('#chat-area')
	area.append("<div class='chat-line'>" +
			"[<span class='user-status'>" + user.status + "</span>" +
			"<span class='user-name'>" + user.name + "</span>] " +
			"<span class='message'>" + message.escapeHTML() + "</span>" +
		"</div>"
	);

}

Room.prototype.addUser = function(user) {
	this.users.push(user);
	$('#user-list').append("<li id='" + user.id + "-user-entry'>" +
		"<span class='user-status'>" + user.status + "</span>" +
		"<span class='user-name'>" + user.name + "</span></li>"
	);
}

var Game = function() {
	this.lastTime = +new Date()
	this.updateCallback = this.update.bind(this)
	this.updateable = []
	this.room = new Room()
}

Game.prototype.update = function(now) {
	var delta = now - this.lastTime
	this.lastTime = now

	// Do stuff.
	this.updateable.forEach(function(u) {
		u.update(delta)
	});

	// request another
	window.requestAnimationFrame(this.updateCallback)
}

Game.prototype.start = function() {
	window.requestAnimationFrame(this.updateCallback)
}

$( function() {

	window.gameState = new Game()
	window.gameState.start()

	// Testing stuff
	$('#fake-join-button').click(function() {
		var user = new User();
		if(Math.random() > .5) {
			user.op();
		}
		window.gameState.room.addUser(user);
	});

	$('#fake-chat-button').click(function() {
		var users = window.gameState.room.users
		window.gameState.room.addMessage(
			users[Math.floor(Math.random() * users.length)],
			"hi"
		);

	});

	$( "#irc-dialog").dialog({
		closeOnEscape: false,
		minWidth: 500,
		minHeight: 500,
		beforeClose: function() {
			return false;
		},
	});

	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		autoOpen: false,
		/*
		position: { my: "center center", at: "center center", of: $('#desktop-area') },
		*/
		buttons: {
			"Delete all items": function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
} );

