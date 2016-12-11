"use strict"

class KeygenFile extends File {
	constructor(name) {
		super(name + ".exe", "img/key_icon.png");
	}

	launch() {
		alert("all the keys");
	}

	static generateName() {
		var base = ExecutableFile.generateName()
		return "KEYGEN-" + base;
	}

	static generate() {
		var name = KeygenFile.generateName();
		return new KeygenFile(name);
	}
}


