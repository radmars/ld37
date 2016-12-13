"use strict"

class UserTroll2 extends User {
	constructor() {
		super();
	}

	onKick(by, user) {
		super.onKick(by, user)
		this.makeFriend(by);
	}
	
	// note html probably in message. everyone gets this.
	onChatMessage(user, message) {
		
	}
	
	makeRival(user) {
		super.makeRival(user);
		window.setTimeout(this.postVirus.bind(this, user), Math.random() * 10000);
	}

	postVirus(user) {
		var file = ExecutableFile.createKickVirus(user);
		var message = jQuery("<span></span>")
			.append(this.getChatData().response.new_kick_virus.randomElement())
			.append(this.createFileDownloadElement(file))
		window.gameState.room.addDownloadMessage(this, message, file);
	}

	getChatData() {
		return {
			banter: [
				'Who wants to chat? Im super interested in meetin new ppl! Im 18 from NYC and wanna learn all about different types of ppl.',
			],
            opp_banter: [
				'op, plz',
                ],
			response: {
				join: [
					'Who wants to chat? Im super interested in meetin new ppl! Im 18 from NYC and wanna learn all about different types of ppl. ',
				],
				new_kick_virus: [
					'Check out this file: ',
				],
				new_friend: [
                    'Im super interested in meetin new ppl! Im 18 from NYC and wanna learn all about different types of ppl. ',
				],
				new_rival: [
					'Im super interested in meetin new ppl!',
				],
				respond_friend: [
					'Im 18 from NYC',
				],
				respond_rival: [
					'super interested in meetin new ppl',
				],
				good_event: [
					'super',
				],
				bad_event: [
					'interested',
				],
				download_start: [
					'cum at me, noob',
				],
				download_end: [
					'lolz, this thing sux. Y wud you even?',
				],
				upload_offer: [
					'check out this file:',
				],
				become_happy: [
                    'Who wants to chat? Im super interested in meetin new ppl! Im 18 from NYC and wanna learn all about different types of ppl. ',
				],
				become_unhappy: [
                    'Who wants to chat? Im super interested in meetin new ppl! Im 18 from NYC and wanna learn all about different types of ppl. ',
				],
			}
		}
	}
}
