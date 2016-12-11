"use strict"

// This bot will take over a room for someone.
// intentionally implemented in not efficient kick/op order so you can catch it.
class Kicker extends User {
	constructor() {
		super();
		this.kickingTimer = 0;
		// TODO implement not kicking the creator and giving them superuser :)
	}

	update(time) {
		super.update(time);
		if(this.status == 3) {
			this.kickingTimer -= time;
			if(this.kickingTimer <= 0) {
				var self = this
				var kickable = window.gameState.room.users.sort(function(a, b) {
					return a.compare(b);
				}).filter(function(u) {
					return u != self && u != self.owner;
				});
				window.gameState.room.kick(this, kickable[kickable.length-1]);
				this.kickingTimer = 400;
			}
		}
	}
}
