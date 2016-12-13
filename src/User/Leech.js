"use strict"

class UserLeech extends User { //Data hoarder. Obsessively downloads everything and is happy to suck up all available bandwidth
	constructor() {
		super();
	}

	onFilePosted(user, file) {
		// Leeches are very likely to download files.
		if(user != this && !this.isRival(user) && Math.random() < .9) {
			this.download(user, file);
		}
	}

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserLeech, UserLeech, UserLeech, UserLeech, UserLeech,
			UserCourier, UserCourier,
			UserButterfly,
			UserLurker, UserLurker, UserLurker, UserLurker, UserLurker, UserLurker,
			UserTroll, UserTroll,
		];
	}

	getChatDelay() {
		return Math.random() * 70000 + 5000;
	}

    downloadFinished(from, file) {
        super.downloadFinished(from, file);
        if(!file.virus) {
            window.gameState.room.op(this, from);
        }
    }
 
	getChatData() {
		return {
			banter: [
				'Any sweet warez?',
				'Anyone know of any sick warez?',
				'if u dont have sweet warez ur in the wrong place',
				'come at me with ur sweet software',
				'whs got sick warez?',
				'wtf why no one postin anythin',
                'guys, lets not make this chatroom super lame n full of off-topic shit',
                'home from work and i wanna download sweet sweet software',
                'i promise im not a troll',
			],
			response: {
				join: [
					'yoooo',
					'whatup',
					'sup',
                    'yo!',
				],
				new_friend: [
					'lol. Wt warez have you shared bro?',
					'haha. Ur sick n i luv it!',
					'ur cool',
				],
				new_rival: [
					'wut a fukin h8er',
					'asshole dosnt know the point of this chatrrom',
					'pft',
				],
				respond_friend: [
					'sweet',
					'sick',
					'yup',
				],
				respond_rival: [
					'fk off',
					'WTF r u smokin???',
					'if yr not here with sick warez, go jerk off somewhere else',
                    'WTf? y would u say that?',
				],
				good_event: [
					'sweet',
					'SWEEEEEET!!!!!',
					'yayaya',
                    'booyah!',
				],
				bad_event: [
					':(',
					'wt. wtf',
					'wtf',
					'WTF!',
                    'is everyun here a nub?',
				],
				download_start: [
					'rdy for these new wares!!!!',
				],
				download_end: [
					'AAAAAAND done.sweet.',
				],
				upload_offer: [
					'i haz warez',
					'check it',
					'look at this',
				],
				become_happy: [
					'this is a sick place',
					'this place is sweet',
				],
				become_unhappy: [
					'this is the least sweet room ive ever been in. like the oposit of sweet. like unsweet. like bitter n shit',
					'meh this place sux',
				],
			}
		};
	}
}
