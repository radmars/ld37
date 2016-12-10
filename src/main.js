"use strict"

var ld37 = {}

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

