"use strict"

var Room = function(downloader) {
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
	this.downloader = downloader;

	this.dialog.on('click', '.inviter', this.inviteRandomMook.bind(this));
	this.dialog.on('click', '.downloader', this.startDownload.bind(this));

	var list = $('#user-list');
	list.on('click', '.kicker', this.kick.bind(this, "RadMars"));
	list.on('click', '.deopper', this.deop.bind(this, "RadMars"));
	list.on('click', '.opper', this.op.bind(this, "RadMars"));

}

Room.prototype.startDownload = function(e) {
	var file = jQuery.data(e.target.parentElement, "file");
	this.downloader.start(file, function() {
	});
	jQuery(e.target).replaceWith("DOWNLOADED!");
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

	this.addInternal(
		jQuery("<div class='chat-line'></div>")
			.append("[" + user.nameString() + "] ")
			.append(
				jQuery("<span class='message' style='color: " + user.color + "'></span>")
					.append(message)
			)
	);
}

Room.prototype.kick = function(by, e) {
	var user = jQuery.data(jQuery(e.target).closest("li")[0], "user")

	this.addInternal("<div class='kick-line'>" +
		"User " + user.nameString() +
		" got booted from <span class='room-name'>#radwarez</span> by " +
		by + "</div>"
	);
	this.removeUser(user);
}

Room.prototype.op = function(by, e) {
	var user = jQuery.data(jQuery(e.target).closest("li")[0], "user")
	user.op();
	this.addInternal("<div class='op-line'>" +
		"User " + user.nameString() +
		" got promoted to " + user.statusName() + " status by " + by + "</div>"
	);
	this.updateUserListItem(user);
}

Room.prototype.deop = function(by, e) {
	var user = jQuery.data(jQuery(e.target).closest("li")[0], "user")
	user.deop();
	this.addInternal("<div class='deop-line'>" +
		"User " + user.nameString() +
		" got demoted to " + user.statusName() + " status by " + by + "</div>"
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
		(user.canControl() ?
			" <span class='controls'>" +
			"[<a href='#' class='kicker'>K/B</a>]" +
			"[<a href='#' class='deopper'>deop</a>]" +
			"[<a href='#' class='opper'>op</a>]" +
			"</span>" : "");
}

Room.prototype.addUser = function(user) {
	this.users.push(user);
	window.gameState.addUpdater(user);
	var element = $("<li id='" + user.id + "-user-entry'>" +
		this.getUserListElementContent(user) + "</li>"
	);

	jQuery.data(element[0], 'user', user);


	var list = $('#user-list');
	list.append(element)

	var li = $('#user-list li');
	li.sort(function(e1, e2) {
		var u1 = jQuery.data(e1, "user");
		var u2 = jQuery.data(e2, "user");
		return u1.compare(u2);
	}).appendTo(list);

	this.addInternal(
		jQuery("<div class='join-line'></div>")
			.append(
				"User " + user.nameString() +
				" joined <span class='room-name'>#radwarez</span>"
			)
	);
}
