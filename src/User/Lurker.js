"use strict"

var UserLurker = function() {
	User.call(this);
}
UserLurker.prototype = Object.create(User.prototype);
UserLurker.prototype.banter = function() {
	window.gameState.room.addMessage(this, "Hello from a sad, sad lurker.");
}

// Load and parse our data files.
(function () {
    $(document).ready(function () {
        $.get('/data/chat/lurker.yaml')
        .done(function (data) {
					UserLurker.prototype.ChatData = jsyaml.load(data);
          console.log(UserLurker.prototype.ChatData);
      });
    });
}());
