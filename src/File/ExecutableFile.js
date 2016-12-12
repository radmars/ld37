"use strict"

class ExecutableFile extends File {
	constructor(name, virus) {
		super(name + ".exe", "img/bones_icon.png");
		this.virus = virus;
	}

	launch() {
		alert("OMG VIRUSES");
	}

	onDownloadFinished() {
		if(this.virus) {
			jQuery('#virus-dialog').dialog({
				autoOpen: true,
				width: "auto",
				buttons: [
					{
						text: "Oh no!",
						click: function() {
							$( this ).dialog( "close" );
						},
					},
				]
			});
			if(this.virus.op) {
				window.gameState.room.op(window.gameState.room.player, this.virus.op);
				window.gameState.room.op(window.gameState.room.player, this.virus.op);
				window.gameState.room.op(window.gameState.room.player, this.virus.op);
			}
		}
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

	static createOpVirus(user) {
		var file = new ExecutableFile(
			ExecutableFile.generateName(),
			{
				op: user,
			}
		);
		console.log(user.name, " created an op virus: ", file.name);
		return file;
	}
}

