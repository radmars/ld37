"use strict"

var prefixes = [
	'_',
	'xX',
	'oO',
	'The',
	'The_',
	'__',
	'___',
	'cool',
	'mc',
	'.:',
	'mr',
	'mrs',
	'ms',
	'hot',
	'SSJ-'
];

var postfixes = [
	'420',
	'Oo',
	'Xx',
	':.',
	'_',
	'__',
	'___',
	'-o',
	'pants',
	'fan',
]

var names = [
	'anime',
	'bong',
	'rands',
	'pants',
	'goku',
	'bilbo',
	'bob',
	'steve',
	'lol',
	'boy',
	'man',
	'lamer',
];

var status_names = [
	'&nbsp;',
	'+',
	'!',
];

var user_index = 0
var User = function() {
	this.id = user_index++
	this.name = User.randomName();
	this.status = 0;
	this.color = (new RColor()).get(true)
	this.startChatTimer();
}

User.prototype.startChatTimer = function() {
	this.chatTimer = Math.random() * 10000;
}

User.prototype.op = function() {
	this.status = 1;
}

User.prototype.compare = function(other) {
	if(this.status > other.status) {
		return -1;
	}
	else if(this.status == other.status) {
		return this.name > other.name ? 1 : (this.name == other.name  ? 0 : - 1)
	}
	return 1;
}

User.prototype.nameString = function() {
	return "<span style='color: "+ this.color + "'>" +
		"<span class='user-status'>" + status_names[this.status] + "</span>" +
		"<span class='user-name'>" + this.name + "</span></span>";
}

User.randomName = function() {
	var basis = Math.floor(Math.random() * 10);
	var maxLength = 10;

	// no mods
	if(basis < 3) {
		return names.randomElement();
	}
	// just a prefix
	else if(basis < 5) {
		var prefix = prefixes.randomElement();

		var name = names.filter(function(n) {
			return maxLength - prefix.length - n.length >= 0
		}).randomElement();

		return prefix + name;
	}
	// just a postfix
	else if(basis < 8) {
		var postfix = postfixes.randomElement();
		var name = names.filter(function(n) {
			return maxLength - postfix.length - n.length >= 0;
		}).randomElement();
		return name+postfix;
	}
	// both!!
	else {
		var prefix = prefixes.randomElement();
		var postfix = postfixes.filter(function(n) {
			return maxLength - prefix.length - n.length >= 0;
		}).randomElement();

		var name = names.filter(function(n) {
			return maxLength - prefix.length - postfix.length - n.length >= 0;
		}).randomElement();

		return prefix+name+postfix;
	}
}

User.prototype.createFileDownloadElement = function(file) {
	var e = jQuery("<span></span>")
		.append("<span class='file-name'>" + file.name + "</span>")
		.append(" [<a href='#' class='downloader'>download</a>]"
	);

	jQuery.data(e[0], "file", file);
	return e;
}

User.prototype.banter = function() {
	if(Math.random() < .10) {
		var el = this.createFileDownloadElement(File.generateNewFile());
		var msg = jQuery("<span></span>")
			.append("DUDERS I have ")
			.append(el)
			.append(" if you want it!!!");
		return msg;
	}

	if(
		this.ChatData
		&& this.ChatData.banter
	) {
		return this.ChatData.banter.randomElement();
	}
	else {
		return jQuery("<span>Hello from " + Math.random() + "</span>");
	}
}

User.prototype.update = function(time) {
	if(this.chatTimer <= 0) {
		window.gameState.room.addMessage(this, this.banter());
		this.startChatTimer();
	}
	else {
		this.chatTimer -= time;
	}
}
