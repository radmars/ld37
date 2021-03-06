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
	this._stop = false;
}

Game.prototype.update = function(now) {
	var delta = now - this.lastTime
	this.lastTime = now

	// Do stuff.
	this.updaters.forEach(function(u) {
		try {
			u.update(delta)
		}
		catch(e) {
			console.error(e);
		}
	});

	// request another
	if(!this._stop) {
		window.requestAnimationFrame(this.updateCallback)
	}
}

Game.prototype.start = function() {
	this.lastTime = 0
	this.updateCallback = this.update.bind(this)
	this.updaters = []

	this.player = new RadUser();
	this.desktop = new Desktop()
	this.downloader = new DownloadDialog(this.desktop)
	this.addUpdater(this.downloader);
	this.room = new Room(this.player, this.downloader);

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

Game.prototype.stop = function() {
	this._stop = true;
}

Game.prototype.restart = function() {
	window.location.reload();
}

$( function() {
	window.gameState = new Game()
	window.gameState.start()
	$('#restart-button').click(function() {
		window.gameState.restart();
	});

	$('#help-button').click(function() {
		$('#help-dialog').dialog({
			autoOpen: true,
			width: 400,
			height: 600,
			modal: true,
		});
	});

	$('#credits-button').click(function() {
		$('#credits-dialog').dialog({
			autoOpen: true,
			width: "auto",
			modal: true,
		});
	});
} );

