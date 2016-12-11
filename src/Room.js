"use strict"

var Room = function() {
	this.dialog = $( "#irc-dialog").dialog({
		closeOnEscape: false,
		minWidth: 500,
		minHeight: 500,
		height: 500,
		autoOpen: false,
		appendTo: $('.desktop-area'),
		beforeClose: function() {
			return false;
		},
	});

	this.users = []
	this.messages = [];
}

Room.prototype.show = function() {
	this.dialog.dialog("open");

}

Room.prototype.addInternal = function(text) {
	var area = $('#chat-area')

	var scroll = area[0].scrollHeight - area.scrollTop() - area.outerHeight() < 1;

	area.append(text);

	// Only keep last 500
	jQuery('*:lt(-500)', area).remove()
	if(scroll) {
		$('*', area).last().get(0).scrollIntoView();
	}
}

Room.prototype.addMessage = function(user, message) {
	this.messages.push({
		user: user,
		message: message,
	});
	this.addInternal("<div class='chat-line'>" +
			"[" + user.nameString() + "] " +
			"<span class='message' style='color: " + user.color + "'>" + message.escapeHTML() + "</span>" +
		"</div>"
	);
}

Room.prototype.kick = function(user, by) {
	this.addInternal("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got booted from <span class='room-name'>#radwarez</span> by " +
		by + "</div>"
	);
	this.removeUser(user);
}

Room.prototype.op = function(user, by) {
	this.addInternal("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got ops from " + by + "</div>"
	);
}

Room.prototype.removeUser = function(user) {
	$('#' + user.id + '-user-entry').remove();
	var i = this.users.indexOf(user);
	if(i >= 0) {
		this.users.splice(i, 1);
	}
	window.gameState.removeUpdater(user);
}

Room.prototype.addUser = function(user) {
	this.users.push(user);
	window.gameState.addUpdater(user);
	var element = $("<li id='" + user.id + "-user-entry'>" +
		user.nameString() +
		" <span class='controls'>" +
		"[<a href='#' class='kicker'>K/B</a>]" +
		"[<a href='#' class='opper'>op</a>]" +
		"</span></li>"
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
