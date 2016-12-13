"use strict"

class UserTroll3 extends User {
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

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserTroll, UserTroll, UserTroll,
			UserTroll2, UserTroll2, UserTroll2,
			UserTroll3, UserTroll3, UserTroll3,
			UserTroll3, UserTroll3, UserTroll3,
			Kicker, Kicker, Kicker,
		];
	}

	getChatData() {
		return {
			banter: [
                'guyz i have a way to watch new movies', 
                'if you wanna download new moviez hit me up!!',
                'program to donwload new moveez. only 99 cents!',
                'sellin some cheap awesum software',
                'i got som sick new warez peeps! coming up soon!',
                'my stuff is less than a $ but worth loads',
                '$0.99 is all im asking for a lifetime of free moveez',
			],
            opp_banter: [
				'op, plz',
                'if u make me an op, i can invite more cool peeps',
                ],
			response: {
				join: [
					'hi all',
                    'hey',
                    'yo',
                    'yoooo',
				],
				new_kick_virus: [
					'Check out this file: ',
                    'sick warez dudes:',
                    'this is cool, peeps:',
                    'some free movies, on me',
				],
				new_friend: [

                    'hey, you want free new movies? I have this cool program. Only 99 cents!',
                    'ur cool. I can get you free movies for a discount. like only 50 cents.',

				],
				new_rival: [
					
                    'y are u so stupid? U dont deserv my cool movie software',
                    'ur a dick. Just go plz',

				],
				respond_friend: [
					
                    'that was clever! u shud take a look at my movie software. i think u mite like it!',
                    'lol, awesum!', 

				],
				respond_rival: [
					
                    'no. thats kinda stupid. whats NOT stupid is this sweet movie donwloader i have. Only $0.99!',
                    'WTf? y would u say that?',

				],
				good_event: [
					'woot!',
                    'awesum',
				],
				bad_event: [
					'wtf!!!!!',
				],
				download_start: [
					'this luks awesum!',
                    'almsot as exited about this as about the new Tomb Breaker moovee',
				],
				download_end: [
					'end scene!',
				],
				upload_offer: [
					'check out this file:',
                    'check this out dudes n dudettes!',
                    'this is cool, peeps!',
                    'have a free movie guyzzz',
                    'ill give this one for freee but all my others are ONLY $0.99',
				],
				become_happy: [
                    'yall are awesum!',
				],
				become_unhappy: [
                    'u all are stupid. none of u deserve my great software for free movies. yall will miss out when i leave cuz its only 99 cents!!!',
				],
				receive_virus: [
                    'lol I got pwnt',
                    'virus lol',
                    'haxxed file',
				],
			}
		}
	}
}
