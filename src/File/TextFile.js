"use strict"

class TextFile extends File {
	constructor(name) {
		super(name + ".txt", "img/rad_icon.png");
	}

	launch() {
		jQuery(
			"<span>" +
			"<img src='img/text.png' />" +
			"</span>"
		).dialog({
			autoOpen: true,
			title: this.name,
			width: "auto",
			appendTo: $(".desktop-area"),
		});
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




