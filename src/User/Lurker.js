"use strict"

class UserLurker extends User {
	constructor() {
		super();
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
