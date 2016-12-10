"use strict"

var user_index = 0
var User = function(name, status) {
	this.id = user_index++
	this.name = "RandomMook" + this.id
	this.status = ' ';
	this.color = (new RColor()).get(true)
}

User.prototype.op = function() {
	this.status = '@'
}

User.prototype.nameString = function() {
	return "<span style='color: "+ this.color + "'>" +
		"<span class='user-status'>" + this.status + "</span>" +
		"<span class='user-name'>" + this.name + "</span></span>";
}


