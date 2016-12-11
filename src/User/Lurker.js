"use strict"

class UserLurker extends User {
	constructor() {
		super();
	}
}

// Load and parse our data files.
$.get('/data/chat/Lurker.yaml')
.done(function (data) {
	UserLurker.prototype.chatData = jsyaml.load(data);
});
