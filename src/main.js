"use strict"

var rcolor = new RColor();

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


var Game = function() {
	this.lastTime = 0
	this.updateCallback = this.update.bind(this)
	this.updaters = []
	this.room = new Room()
}

Game.prototype.update = function(now) {
	var delta = now - this.lastTime
	this.lastTime = now

	// Do stuff.
	this.updaters.forEach(function(u) {

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
		height: 500,
		beforeClose: function() {
			return false;
		},
	});

	window.gameState.downloader = new DownloadDialog()
	window.gameState.updaters.push(window.gameState.downloader);
	window.gameState.downloader.start("Kill_Bill.ram.mov", function() {
		console.log("Download finished");
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

