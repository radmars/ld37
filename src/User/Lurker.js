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

	startChatTimer() {
		this.chatTimer = Math.random() * 70000 + 5000;
	}

	getChatData() {
		return {
			banter: [
				'Any sweet warez?',
				'...',
				'Anyone know of any sick warez?',
			],
			response: {
				new_friend: [
					'lol',
					'ur funny',
				],
				new_rival: [
					'IGNORE',
					'whateva',
				],
				respond_friend: [
					'+1',
					':)',
				],
				respond_rival: [
					'lol, whatevs',
					'...',
				],
				good_event: [
					':D',
				],
				bad_event: [
					':(',
				],
				download_start: [
					'!',
				],
				download_end: [
					'done!',
				],
				upload_offer: [
					'something cool for yall',
				],
				become_happy: [
					'i dont normally say things like this but yall are great',
				],
				become_unhappy: [
					'... ... ...',
				],
			}
		};
	}
}
