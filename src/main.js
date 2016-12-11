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
	this.desktop = new Desktop()
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

	window.gameState.downloader = new DownloadDialog()
	window.gameState.addUpdater(window.gameState.downloader);
	window.gameState.downloader.start("IRC Client.exe", function() {
		window.gameState.downloader.extra("All done!");
		window.setTimeout(function() {
			window.gameState.room.show();
			window.gameState.downloader.close("close")
		}, 1000);
		console.log("Download finished");
	});

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

	$('#fake-download').click(function() {
		var file = new File("hello_world.exe", "img/key_icon.png");
		window.gameState.downloader.start(file.name, function() {
			window.gameState.desktop.addFile(file);
			window.gameState.downloader.extra("All done!");
			window.setTimeout(function() {
				window.gameState.room.show();
				window.gameState.downloader.close("close")
			}, 1000);

		});
	});

} );

