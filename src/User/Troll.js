"use strict"

class UserTroll extends User {
	constructor() {
		super();
	}
}

// Load and parse our data files.
$.get('/data/chat/Troll.yaml')
.done(function (data) {
	UserTroll.prototype.chatData = jsyaml.load(data);
});
