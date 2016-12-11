"use strict"

var rcolor = new RColor();

Array.prototype.randomElement = function() {
	if(this.length == 0) {
		return '';
	}
	return this[Math.floor(Math.random() * this.length)];
}

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

	this.desktop = new Desktop()
	this.downloader = new DownloadDialog(this.desktop)
	this.addUpdater(this.downloader);
	this.room = new Room(this.downloader);
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
	this.room.show();
	window.requestAnimationFrame(this.updateCallback)
}

Game.prototype.addUpdater = function(u) {
	this.updaters.push(u);
}

Game.prototype.removeUpdater = function(u) {
	var i = this.updaters.indexOf(u);
	if(i >= 0) {
		this.updaters.splice(i, 1);
	}
}

$( function() {

	window.gameState = new Game()
	window.gameState.start()

	/*
	window.gameState.downloader.start("IRC Client.exe", function() {
		window.gameState.room.show();
	});
	*/

	// Testing stuff
	$('#fake-join-button').click(function() {
		window.gameState.room.inviteRandomMook();
	});

	$('#fake-chat-button').click(function() {
		var user = window.gameState.room.users.randomElement();
		window.gameState.room.addMessage( user, user.banter() );
	});

	$('#fake-download').click(function() {
		var file = File.generateNewFile();
		window.gameState.downloader.start(file, function() {
			window.gameState.desktop.addFile(file);
		});
	});

} );

