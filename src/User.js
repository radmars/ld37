"use strict"

var prefixes = [
	'_',
	'xX',
	'oO',
	'The',
	'The_',
	'__',
	'___',
	'cool',
	'mc',
	'.:',
	'mr',
	'mrs',
	'ms',
	'hot',
	'SSJ-',
    'death',
    'toy',
    'pink',
    'strange',
    'dr',
    'madam',
    'sir',
    'robotic',
    'fluffy',
    'hawt',
    'hypersonic',
    'subzero',
    'burning',
    'silver',
    'drunk',
    'professor',
    'alien',
    'cryptic',
];

var postfixes = [
	'420',
	'Oo',
	'Xx',
	':.',
	'_',
	'__',
	'___',
	'-o',
	'pants',
	'fan',
    'cule',
    'esq',
    'lover',
    'killa',
    'painter',
    'feeder',
    'puncher',
    'muncher',
    'coater',
]

var names = [
	'anime',
	'bong',
	'rands',
	'pants',
	'goku',
	'bilbo',
	'bob',
	'steve',
	'lol',
	'boy',
	'man',
	'lamer',
    'killa',
    'gangsta',
    'lady',
    'girl',
    'boy',
    'princess',
    'toy',
    'sucka',
    'leopard',
    'alien',
    'spider',
    'lozenge',
    'lucas',
    'small',
];

var status_token = [
	'&nbsp;',
	'+',
	'!',
	'%'
];

var status_name = [
	'muted',
	'voiced',
	'operator',
	'superuser',
];

var user_index = 0

class User {
	constructor(name) {
		this.id = user_index++
		this.name = name || User.randomName();
		this.status = 0;
		this.happiness = 5;
		this.friends = {};
		this.rivals = {};
		this.color = (new RColor()).get(true)
		this.newToRoom = true;
		this.messageQueued = false;
		this.startChatTimer();
		this.chatData = this.getChatData();
		console.log(this.name, " is a ", this.constructor.name);
	}

	// note html probably in message. everyone gets this.
	onChatMessage(user, message) {
	}

	// User who got kicked doesn't get this. They're already gone.
	onKick(by, user) {
		if (this.isFriend(user)) {
			this.lessHappy(1);
		}
		else if (this.isRival(user)) {
			this.moreHappy(1);
		}
	}

	// Everyone gets this.
	onOp(by, user) {
		if (this.isSelf(user)) {
			this.moreHappy(1);
			this.makeFriend(user);
		}
	}

	// Everyone gets this.
	onDeop(by, user) {
		if (this.isSelf(user)) {
			this.lessHappy(1);
			this.makeRival(user);
		}
	}

	onFilePosted(user, file) {
		// Average user not very likely to download file
		if(user != this && !this.isRival(user) && Math.random() < .40) {
			this.download(user, file);
		}
	}

	// User who left does not get this, they're already gone.
	onLeave(user) {
		if (this.isFriend(user)) {
			this.lessHappy(1);
		}
		else if (this.isRival(user)) {
			this.moreHappy(1);
		}
		delete this.rivals[user]
		delete this.friends[user]
	}

	////
	// Code for managing user relationships.
	////

	// Friendship is a one-way-street; other user may not like this one.
	makeFriend(user) {
		if (this.isFriend(user)) {
			// Nothing to do.
			return;
		}

		//this.sendMessage("new_friend");
		this.friends[user.id] = 1;
		// Kiss and make up
		if (this.isRival(user)) {
			this.unRival(user);
		}
	}

	// Same with rivalry. Seriously dude? I don't even know you exist.
	makeRival(user) {
		if (this.isRival(user)) {
			// Nothing to do.
			return;
		}

		this.sendMessage("new_rival");
		this.rivals[user.id] = 1;
		// I don't even know you anymore!
		if (this.isFriend(user)) {
			this.unFriend(user);
		}
	}

	isFriend(user) {
		if (this.friends[user.id]) {
			return true;
		}
		else {
			return false;
		}
	}

	isRival(user) {
		if (this.rivals[user.id]) {
			return true;
		}
		else {
			return false;
		}
	}

	isSelf(user) {
		if (this.id === user.id) {
			return true;
		}
		else {
			return false;
		}
	}

	unFriend(user) {
		if (this.friends[user.id]) {
			delete this.friends[user.id];
		}
	}
	unRival(user) {
		if (this.rivals[user.id]) {
			delete this.rivals[user.id];
		}
	}

	moreHappy(change) {
		this.happiness += change;
		//this.sendMessage("good_event");
	}

	lessHappy(change) {
		this.happiness -= change;
		if(this.happiness < -5) {
			window.gameState.room.leave(this);
		}
}

	////
	//
	////

	getChatDelay() {
		return Math.random() * 10000;
	}

	startChatTimer() {
		if(this.newToRoom) this.chatTimer = 1000;
		else this.chatTimer = this.getChatDelay();
	}
	
	

	op() {
		if(this.status < 3) {
			this.status++;
		}
	}

	deop() {
		if(this.status > 0) {
			this.status--;
		}
	}

	statusName() {
		return status_name[this.status];
	}

	compare(other) {
		if(this.status > other.status) {
			return -1;
		}
		else if(this.status == other.status) {
			return this.name > other.name ? 1 : (this.name == other.name  ? 0 : - 1)
		}
		return 1;
	}

	nameString() {
		return "<span style='color: "+ this.color + "' title=' "+ status_name[this.status] + "'>" +
			"<span class='user-status'>" + status_token[this.status] + "</span>" +
			"<span class='user-name'>" + this.name + "</span></span>";
	}

	static randomName() {
		var basis = Math.floor(Math.random() * 10);
		var maxLength = 10;

		// no mods
		if(basis < 3) {
			return names.randomElement();
		}
		// just a prefix
		else if(basis < 5) {
			var prefix = prefixes.randomElement();

			var name = names.filter(function(n) {
				return maxLength - prefix.length - n.length >= 0
			}).randomElement();

			return prefix + name;
		}
		// just a postfix
		else if(basis < 8) {
			var postfix = postfixes.randomElement();
			var name = names.filter(function(n) {
				return maxLength - postfix.length - n.length >= 0;
			}).randomElement();
			return name+postfix;
		}
		// both!!
		else {
			var prefix = prefixes.randomElement();
			var postfix = postfixes.filter(function(n) {
				return maxLength - prefix.length - n.length >= 0;
			}).randomElement();

			var name = names.filter(function(n) {
				return maxLength - prefix.length - postfix.length - n.length >= 0;
			}).randomElement();

			return prefix+name+postfix;
		}
	}

	createFileDownloadElement(file) {
		var e = jQuery("<span></span>")
			.append("<span class='file-name'>" + file.name + "</span>")
			.append(" [<a href='#' class='downloader'>download</a>]"
		);

		jQuery.data(e[0], "file", file);
		return e;
	}

	banter() {

		if(
			this.chatData
			&& this.chatData.banter
		) {
			return this.chatData.banter.randomElement();
		}
		else {
			return jQuery("<span>Hello from " + Math.random() + "</span>");
		}
	}

	getMessage(type) {
		if (
			this.chatData
			&& this.chatData.response
			&& this.chatData.response[type]
		) {
			return this.chatData.response[type].randomElement();
		}
		else {
			return "Generic " + type + " message.";
		}
	}

	sendMessage(type) {
		if(this.messageQueued) {
			return;
		} else {
			var message = this.getMessage(type);
			window.setTimeout(this.finishSendingMessage(message), message.length * 100);
			this.messageQueued = true;
		}
	}
	
	finishSendingMessage(message) {
		window.gameState.room.addMessage(this, message);
		this.messageQueued = false;
	}
	
	makeDecision() {
		var decision = Math.random();
		//10% of the time offer a file
		if(decision < .10) { 
			var file = File.generateNewFile();
			var msg = jQuery("<span></span>")
			.append("DUDERS I have ")
			.append(this.createFileDownloadElement(file))
			.append(" if you want it!!!");
			window.gameState.room.addDownloadMessage(this, msg, file);
		//10% of the time, if op, invite a random user
		} else if (decision < .20 && this.status >= 2) { 
			window.gameState.room.inviteMookFromList(this.getInviteList());
		//otherwise, just banter
		} else { 
			window.gameState.room.addMessage(this, this.banter());
		}
	}
	
	update(time) {
		if(this.chatTimer <= 0) {
		
			//say hi upon join
			if(this.newToRoom) { 
				this.sendMessage("join");
				this.newToRoom = false;
			} else {
				this.makeDecision();
			}
			this.startChatTimer();
		}
		else {
			this.chatTimer -= time;
		}
	}

	canControl(user) {
		if(this.status >= user.status && this.status >= 2) {
			return 1;
		}
	}

	canPromote(user) {
		if(this.status > user.status && this.status >= 2) {
			return 1;
		}
	}

	download(from, file) {
		window.setTimeout(this.downloadFinished.bind(this, from, file), Math.random() * 5000);
	}

	downloadFinished(from, file) {
		if(!file.virus) {
			this.makeFriend(from);
		}
		file.finish(this);
	}

	getInviteList() {
		return [
			// Probabilties are fun, aren't they?
			UserLeech, UserLeech,
			UserCourier, UserCourier,
			UserButterfly, UserButterfly, UserButterfly,
			UserLurker, UserLurker, UserLurker, UserLurker, UserLurker, UserLurker,
			UserTroll, UserTroll, UserTroll
		];
	}

	getChatData() {
	}

}

