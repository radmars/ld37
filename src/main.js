"use strict"

var rcolor = new RColor();

function newCall(Cls) {
	return new (Cls.bind.apply(Cls, arguments))();
}

Array.prototype.randomElement = function() {
	if(this.length == 0) {
		return '';
	}
	return this[Math.floor(Math.random() * this.length)];
}

String.prototype.paddingLeft = function (paddingValue) {
	return String(paddingValue + this).slice(-paddingValue.length);
};

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

	this.player = new RadUser();
	this.desktop = new Desktop()
	this.downloader = new DownloadDialog(this.desktop)
	this.addUpdater(this.downloader);
	this.room = new Room(this.player, this.downloader);
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
	this.room.addUser(this.player);
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
} );

