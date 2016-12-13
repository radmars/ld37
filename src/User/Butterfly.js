"use strict"

class UserButterfly extends User {
	constructor() {
		super();
	}

	onFilePosted(user, file) {
		// Joins the channel primarily to socialize, not terribly interested in warez.
		if(user != this && !this.isRival(user) && Math.random() < .25) {
			this.download(user, file);
		}
	}

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserLeech,
			UserButterfly, UserButterfly, UserButterfly,
			UserLurker, UserLurker, UserLurker,
		];
	}

	getChatDelay() {
		return Math.random() * 3000 + 3000;
	}

	makeFriend(f) {
		super.makeFriend(f);
		window.gameState.room.op(this, f);
	}

	getChatData() {
		return {
			banter: [
				'Best thing after a long day of work is chatting with all you fine folk',
				'so I had the most random day at work today. My boss is SERIOUSLY nuts!',
				'How is everyone doing?',
				'...hello?',
			],
			response: {
				join: [
					'Hi all!',
					'Helloooo',
					'Hello everyone!',
				],
				new_friend: [
					'Haha! You’re awesome, has anyone told you that recently?',
					':D my man! (or woman, not trying to be sexist here)',
				],
				new_rival: [
					'You don’t seem like a very nice person. Just an observation.',
					'Look punk, have you ever thought that if you try being nice to people, they might be nice back to you? And the world will be better for it?',
				],
				respond_friend: [
					'Seriously, you’re the life of this chatroom',
					'haha! Couldn’t have said it better myself!',
				],
				respond_rival: [
					'I don’t really think so.',
					'I’m not going to justify that with a response',
					'Who even invited you here?!',
				],
				good_event: [
					'Yay! I’m so happy!',
					'Yeahhh!',
					'Alright!',
				],
				bad_event: [
					'Awww….this really sucks...',
				],
				download_start: [
					'I’m so looking forward to this!',
				],
				download_end: [
					'Ta da! Download complete! Let’s see what this baby can do (baby in a non-gender-specific sort of way)',
				],
				upload_offer: [
					'Hey everyone! I have a file that you all might like!',
				],
				become_happy: [
					'You guys make my life worth living. Seriously, y’all are AWESOME.',
				],
				become_unhappy: [
					'I’m feeling kinda bummed out right now...',
				],
			}
		};
	}
}
