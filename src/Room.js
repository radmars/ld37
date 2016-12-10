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

Room.prototype.addUser = function(user) {
	this.users.push(user);
	$('#user-list').append("<li id='" + user.id + "-user-entry'>" +
		user.nameString() + "</li>"
	);

	var area = $('#chat-area');
	area.append("<div class='join-line'>" +
		"User " + user.nameString() +
		" joined <span class='room-name'>#radwarez</span></div>"
	);
}
