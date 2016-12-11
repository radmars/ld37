"use strict"

var Room = function() {
	this.dialog = $( "#irc-dialog").dialog({
		closeOnEscape: false,
		minWidth: 500,
		minHeight: 500,
		height: 500,
		width: 800,
		autoOpen: false,
		appendTo: $('.desktop-area'),
		beforeClose: function() {
			return false;
		},
	});

	this.users = []
	this.messages = [];

	this.dialog.on('click', '.inviter', this.inviteRandomMook.bind(this));
}

Room.prototype.inviteRandomMook = function() {
	var user;
	if(Math.random() > .5) {
		user = new User();
	}
	else {
		user = new UserLurker();
	}
	if(Math.random() > .5) {
		user.op();
	}
	this.addUser(user);
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
	user.op();
	this.addInternal("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got ops from " + by + "</div>"
	);
	this.updateUserListItem(user);
}

Room.prototype.updateUserListItem = function(user) {
	$('#' + user.id + '-user-entry').html(
		this.getUserListElementContent(user)
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

Room.prototype.getUserListElementContent = function(user) {
	return user.nameString() +
		" <span class='controls'>" +
		"[<a href='#' class='kicker'>K/B</a>]" +
		"[<a href='#' class='opper'>op</a>]" +
		"</span>";
}

Room.prototype.addUser = function(user) {
	this.users.push(user);
	window.gameState.addUpdater(user);
	var element = $("<li id='" + user.id + "-user-entry'>" +
		this.getUserListElementContent(user) + "</li>"
	);

	jQuery.data(element[0], 'user', user);

	jQuery('.kicker', element).click(this.kick.bind(this, user, "RadMars"));
	jQuery('.opper', element).click(this.op.bind(this, user, "RadMars"));

	var list = $('#user-list');
	list.append(element)

	var li = $('#user-list li');
	li.sort(function(e1, e2) {
		var u1 = jQuery.data(e1, "user");
		var u2 = jQuery.data(e2, "user");
		return u1.compare(u2);
	}).appendTo(list);

	var area = $('#chat-area');
	area.append("<div class='join-line'>" +
		"User " + user.nameString() +
		" joined <span class='room-name'>#radwarez</span></div>"
	);
}
