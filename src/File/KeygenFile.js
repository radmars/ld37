"use strict"

class KeygenFile extends File {
	constructor(name, image) {
		super(name + ".exe", "img/key_icon.png");
		this.keyGenImage = image;
	}

	launch() {
		// TODO if we wanted to be nice we'd cache audio tags but I DNGAF.
		jQuery(
			"<span>" +
			"<img src='" + this.keyGenImage + "' />" +
			"<audio autoplay loop>" +
			"<source src='music/ld37-2.mp3' type='audio/mp3' />" +
			"</audio>" +
			"</span>"
		).dialog({
			autoOpen: true,
			beforeClose: function(e) {
				jQuery("audio", this)[0].pause();
			},
			title: this.name,
			width: "auto",
			appendTo: $(".desktop-area"),
		});
	}

	static generateName() {
		var base = ExecutableFile.generateName()
		return "KEYGEN-" + base;
	}

	static generateImage() {
		return [
			'img/keygen1.png',
			'img/keygen2.png',
			'img/keygen3.png',
			'img/keygen4.png',
		].randomElement()
	}

	static generate() {
		var name = KeygenFile.generateName();
		var image = KeygenFile.generateImage();
		return new KeygenFile(name,image);
	}
}


