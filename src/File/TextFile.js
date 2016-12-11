"use strict"

class TextFile extends File {
	constructor(name) {
		super(name + ".txt", "img/rad_icon.png");
	}

	launch() {
		alert("Awesome text file here");
	}

	static generateName() {
		return [
			"J. R. Tokken - King of the bracelets",
			"R. L. Steakzzz - Duckbumps 1 - 100",
			"RadNet User List",
		].randomElement();
	}

	static generate() {
		var name = TextFile.generateName();
		return new TextFile(name);
	}
}




