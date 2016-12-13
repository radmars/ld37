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
				'So I had the most random day at work today. My boss is SERIOUSLY nuts!',
				'How is everyone doing?',
				'What did you all think about the new ZegaMegaZordBot movie?',
                'Okay this is kinda embarrassing, but does anyone know how to treat burns on your but? Sorry if this offends anyone!',
                'Did everyone have a good day?',
                'Tell me your wildest dreams, your deepest desires, your scariest nightmares, your fondest memories! Just, you kknow, tell me about yourselves!',
                'I could MURDER a bowl of ramen right now. Or cold soba. Or udon. Anything long, squishy and slurpy, really. No, not like that, you perverts!',
			],
            
            opp_banter: [
				'By the way, if you want to make me an an operator, I would not mind that at all!',
                'If you make me an op, I will take care of the trolls',
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
                    'You seem like a mean person'
				],
				respond_friend: [
					'Seriously, you’re the life of this chatroom!',
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
