"use strict"

class KeygenFile extends File {
	constructor(name) {
		super(name + ".exe", "img/key_icon.png");
	}

	launch() {
		// TODO if we wanted to be nice we'd cache audio tags but I DNGAF.
		jQuery(
			"<span>" +
			"<img src='img/keygen_1.png' />" +
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

	static generate() {
		var name = KeygenFile.generateName();
		return new KeygenFile(name);
	}
}


