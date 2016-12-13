"use strict"

// Eager pleaser. Attempting to gain "street cred" by providing files without necessarily knowing what they are.
class UserCourier extends User {
	constructor() {
		super();
	}

	onFilePosted(user, file) {
		if(user != this && !this.isRival(user) && Math.random() < .90) {
			this.download(user, file);
		}
	}

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserLeech, UserLeech, UserLeech, UserLeech, UserLeech,
			UserCourier,
			UserLurker, UserLurker,
			UserTroll,
		];
	}

	getChatDelay() {
		return Math.random() * 3000 + 3000;
	}

	onChatMessage(user, message) {
		super.onChatMessage(user, message);
		if(user.troll) {
			this.lessHappy(.5);
		}
	}

	getChatData() {
		return {
			banter: [
				'found some awesome warez in a cache of hacked files from the russian govt u guyz!!',
				'i just got some sick warez. Uploading soon!',
				'lemme know if you guyz want anything specific. I got ways to get em for u',
			],
			response: {
				join: [
					'yooo',
					'hi',
					'sup',
				],
				new_friend: [
					'ur awsm. Wut other chatrooms are u on?',
					'ur cool. Got some sick warez if u want anythin',
				],
				new_rival: [
					'ummm',
					'yo ur mean bro',
				],
				respond_friend: [
					'lolz yes',
					'sure sure!',
				],
				respond_rival: [
					'dont be mean',
					'cmon man lets be nice',
				],
				good_event: [
					'cool beenz',
				],
				bad_event: [
					'y god y?',
				],
				download_start: [
					'zomg so excited for this one',
				],
				download_end: [
					'dun dun DUN!',
				],
				upload_offer: [
					'Offering a SICK program! Srsyl its like cuttin edge stuff. got it off my hacker friend',
				],
				become_happy: [
					'this is like, a sick place. Lots of warez u cant get anywere else!',
				],
				become_unhappy: [
					'this chatroom sucks!!!',
				],
			}
		};
	}
}
