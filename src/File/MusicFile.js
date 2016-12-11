"use strict"

class MusicFile extends File {
	constructor(name) {
		super(name + ".mp3", "img/cd_icon.png");
	}

	launch() {
		alert("Sick AMV music here");
	}

	static generateName() {
		return [
			'Metaldozer - Ride the Pony',
			'Metaldozer - Commander of Dancers',
			'Tifany Spikes - I\'m Happy Girl',
			'Angry at the device - Baboon Radio',
			'Angry at the device - Geese on Display',
		].randomElement();
	}

	static generate() {
		var name = MusicFile.generateName();
		return new MusicFile(name);
	}
}



