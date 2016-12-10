"use strict"

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
			"[" + user.nameString() + "] " +
			"<span class='message'>" + message.escapeHTML() + "</span>" +
		"</div>"
	);

}

Room.prototype.kick = function(user, by) {
	var area = $('#chat-area');
	area.append("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got booted from <span class='room-name'>#radwarez</span> by " +
		by + "</div>"
	);
	this.removeUser(user);
}

Room.prototype.op = function(user, by) {
	var area = $('#chat-area');
	area.append("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got ops from " + by + "</div>"
	);
	console.log("Opping" , user);
}

Room.prototype.removeUser = function(user) {
	$('#' + user.id + '-user-entry').remove();
}

Room.prototype.addUser = function(user) {
	this.users.push(user);
	var element = $("<li id='" + user.id + "-user-entry'>" +
		user.nameString() +
		" [<a href='#' class='kicker'>K/B</a>][<a href='#' class='opper'>op</a>]</li>"
	);

	jQuery('.kicker', element).click(this.kick.bind(this, user, "RadMars"));
	jQuery('.opper', element).click(this.op.bind(this, user, "RadMars"));

	$('#user-list').append(element)
	var area = $('#chat-area');
	area.append("<div class='join-line'>" +
		"User " + user.nameString() +
		" joined <span class='room-name'>#radwarez</span></div>"
	);
}
