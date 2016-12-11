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

var user_index = 0
var User = function() {
	this.id = user_index++
	this.name = User.randomName();
	this.status = '&nbsp;';
	this.color = (new RColor()).get(true)
	this.startChatTimer();
}

User.prototype.startChatTimer = function() {
	this.chatTimer = Math.random() * 10000;
}

User.prototype.op = function() {
	this.status = '+'
}

User.prototype.nameString = function() {
	return "<span style='color: "+ this.color + "'>" +
		"<span class='user-status'>" + this.status + "</span>" +
		"<span class='user-name'>" + this.name + "</span></span>";
}

User.randomElement = function(array) {
	if(array.length == 0) {
		return '';
	}
	return array[Math.floor(Math.random() * array.length)];
}

User.randomName = function() {
	var basis = Math.floor(Math.random() * 10);
	var maxLength = 10;

	// no mods
	if(basis < 3) {
		return User.randomElement(names);
	}
	// just a prefix
	else if(basis < 5) {
		var prefix = User.randomElement(prefixes);
		var name = User.randomElement(names.filter(function(n) { return maxLength - prefix.length - n.length >= 0 }));
		return prefix + name;
	}
	// just a postfix
	else if(basis < 8) {
		var postfix = User.randomElement(postfixes);
		var name = User.randomElement(names.filter(function(n) { return maxLength - postfix.length - n.length >= 0}));
		return name+postfix;
	}
	// both!!
	else {
		var prefix = User.randomElement(prefixes);
		var postfix = User.randomElement(postfixes.filter(function(n) { return maxLength - prefix.length - n.length >= 0}));
		var name = User.randomElement(names.filter(function(n) { return maxLength - prefix.length - postfix.length - n.length >= 0}));
		return prefix+name+postfix;
	}
}

User.prototype.banter = function() {
		window.gameState.room.addMessage(this, "Hello from " + Math.random());
}

User.prototype.update = function(time) {
	if(this.chatTimer <= 0) {
		this.banter();
		this.startChatTimer();
	}
	else {
		this.chatTimer -= time;
	}
}
