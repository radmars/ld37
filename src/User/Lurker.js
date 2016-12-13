"use strict"

class UserLurker extends User {
	constructor() {
		super();
	}

	onFilePosted(user, file) {
		// Lurkers are very likely to download files.
		if(user != this && !this.isRival(user) && Math.random() < .9) {
			this.download(user, file);
		}
	}

	onChatMessage(user, message) {
		super.onChatMessage(user, message);
		if(user.troll) {
			this.lessHappy(1.5);
		}
	}

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserLeech, UserLeech,
			UserButterfly, UserButterfly,
			UserLurker, UserLurker, UserLurker, UserLurker, UserLurker, UserLurker,
			UserTroll, UserTroll,
		];
	}

	getChatDelay() {
		return Math.random() * 70000 + 5000;
	}

	getChatData() {
		return {
			banter: [
				'any sweet warez?',
				'...',
				'anyone know of any sick warez?',
                'havin fun',
                'warez?',
			],
			response: {
				join: [
					'hi',
					'sup',
				],
				new_friend: [
					'lol',
					'ur funny',
				],
				new_rival: [
					'IGNORE',
					'whateva',
					'pft',
				],
				respond_friend: [
					'+1',
					':)',
					'yup',
					'haha',
				],
				respond_rival: [
					'lol, whatevs',
					'...',
				],
				good_event: [
					':D',
					'sweet',
				],
				bad_event: [
					':(',
					'...',
				],
				download_start: [
					'!',
				],
				download_end: [
					'done!',
				],
				upload_offer: [
					'something cool for yall',
					'check it',
					'look at this',
				],
				become_happy: [
					'i dont normally say things like this but yall are great',
					'this place is sweet',
				],
				become_unhappy: [
					'... ... ...',
					'meh this place sux',
				],
			}
		};
	}
}
