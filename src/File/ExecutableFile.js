"use strict"

class ExecutableFile extends File {
	constructor(name) {
		super(name + ".exe", "img/bones_icon.png");
	}

	launch() {
		alert("OMG VIRUSES");
	}

	static generateName() {
		var names = [
			'EscapeFromMiniMars',
			'TenkoseiRobo',
			'DeathDeathEvolution',
			'Micromancer',
			'Protocol on Blinding Lazer Weapons',
			'Flesh Mess',
			'Velocitron',
			'Attack on RadMars',
			'Grim Gateway',
			'The Brink',
			'Space Janitor',
			'Tessitron',
			'The Uncertainty Principle',
		]
		return names.randomElement();
	}

	static generate() {
		var name = ExecutableFile.generateName();
		return new ExecutableFile(name);
	}
}

