"use strict"

class MusicFile extends File {
	constructor(name) {
		super(name + ".mp3", "img/cd_icon.png");

		this.filenames = [
			"atmo-dnb",
			"tup",
			"aor",
		];
	}

	launch() {
		var idx = this.name.charAt(0) - 1;
		var music = "music/ld37-" + this.filenames[idx];

		jQuery(
			"<span>" +
			"<img src='img/music-player.png' />" +
			"<audio autoplay loop>" +
			"<source src='" + music + ".mp3' type='audio/mp3' />" +
			"<source src='" + music + ".ogg' type='audio/ogg' />" +
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
		return [
			'1.Adhesion-rojan-dnb-mix-2k2(edit)',
			'2.The Uncertainty Principle-OST_GAMERIP',
			'3.ATTACK_ON_RADMARS-OST_GAMERIP',
		].randomElement();
	}

	static generate() {
		var name = MusicFile.generateName();
		return new MusicFile(name);
	}
}



