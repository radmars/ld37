"use strict"

var UserLurker = function() {
	User.call(this);
}
UserLurker.prototype = Object.create(User.prototype);

// Load and parse our data files.
$.get('/data/chat/lurker.yaml')
.done(function (data) {
	UserLurker.prototype.ChatData = jsyaml.load(data);
});
