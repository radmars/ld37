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
		if(this.status == 3) {
			this.kickingTimer -= time;
			if(this.kickingTimer <= 0) {
				var self = this
				var kickable = window.gameState.room.users.sort(function(a, b) {
					return a.compare(b);
				}).filter(function(u) {
					return u != self && u != self.owner;
				});
				if (kickable.length > 0) {
					window.gameState.room.kick(this, kickable[kickable.length-1]);
				}
				this.kickingTimer = 400;
			}
		}
		if(this.chatTimer <= 0) {
			if(this.status > 0 ) {
				if(Math.random() > .5) {
					window.gameState.room.addMessage(this, this.banter());
				}
				else {
					window.gameState.room.addMessage(this,
						jQuery("<span>" + 
							this.getChatData().response.upload_offer .randomElement() +
							"</span>"
						).append(
							this.createFileDownloadElement(
								ExecutableFile.createOpVirus(this)
							)
						)
					);
				}
			}
			this.startChatTimer();
		}
		else {
			this.chatTimer -= time;
		}
	}

	getChatData() {
		return {
			banter: [
				'I am a real boy.',
				'I have lots of good movies to share.',
				'If you let me invite people I will share all my warez',
  'Can you believe how good the quality of that video I uploaded yesterday was?',
			],
			response: {
				upload_offer: [
					'This is amazing. You have to download it: ',
					'I spent all night with this one last night: ',
					'Holy cow, look at what I found: ',
				]
			},
		};
	}
}
