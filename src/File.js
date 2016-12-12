"use strict"

var file_index = 0;
class File {
	constructor(name, icon) {
		this.id = file_index++;
		this.name = name
		this.icon = icon
	}

	launch() {
		throw "Not implemented!";
	}

	finish(user) {
		var total = $('#total-downloads');
		var new_value = (jQuery.data(total[0], 'total') || 0) + 1;
		jQuery.data(total[0], 'total', new_value);
		total.text(new_value);
		if(new_value >= 10000 ) {
			jQuery("<span title='Winner!'><h1>OMG you are so popular</h1>You got 10000 downloads.<br /> Might as well call it a win.</span>").dialog({
				modal: true,
				width: "auto",
				beforeClose: function() {
					window.gameState.restart();
				},
				buttons: [{
					text: "Thanks! (restart)",
					click: function() {
						window.gameState.restart();
					},
				}],
			}).dialog("moveToTop");
		}

		this.onDownloadFinished(user)
	}

	onDownloadFinished(user) {
	}

	static generateNewFile() {
		var types = [ExecutableFile, MusicFile, KeygenFile, TextFile]
		var newType = types.randomElement();
		return newType.generate()
	}
}
