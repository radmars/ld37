"use strict"

class UserTroll extends User {
	constructor() {
		super();
	}

	getChatData() {
		return {
			banter: [
				'u all are stupid',
				'this sux',
				'is everyone here a retard?',
			],
			response: {
				new_friend: [
					'ur an idiot',
					'ur brains arent good enuf to feed my dog',
				],
				new_rival: [
					'what a fucktard. Go crawl under your mom’spanties',
					'i wanna rip out your guts and feed them to my trash collectors mom',
				],
				respond_friend: [
					'that was not smart',
					'uuhhhh...that was the stupidest thing i ever heard',
				],
				respond_rival: [
					'the world wud be a better plac w/o ur fukin opinions',
					'y does the world let your opinions even exist?',
				],
				good_event: [
					'booyah fukers!',
				],
				bad_event: [
					'i hate you all',
				],
				download_start: [
					'cum at me, retards',
				],
				download_end: [
					'lolz, this thing sux. Y wud you even?',
				],
				upload_offer: [
					'wich of you morons wants this?',
				],
				become_happy: [
					'yall have shot for brainz!',
				],
				become_unhappy: [
					'ive never seen a biger group of muthafukin bitches in my LIFE',
				],
			}
		}
	}
}
