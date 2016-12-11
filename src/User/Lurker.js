"use strict"

class UserLurker extends User {
	constructor() {
		super();
	}
}

// Load and parse our data files.
$.get('/data/chat/lurker.yaml')
.done(function (data) {
	UserLurker.prototype.ChatData = jsyaml.load(data);
});
