"use strict"

class ExecutableFile extends File {
	constructor(name, virus) {
		super(name + ".exe", "img/bones_icon.png");
		this.virus = virus;
	}

	launch() {
		alert("OMG VIRUSES");
	}

	onDownloadFinished(user) {
		if(this.virus) {
			if(window.gameState.room.player == user) {
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
			}

			if(this.virus.op) {
				window.gameState.room.op(user, this.virus.op);
				window.gameState.room.op(user, this.virus.op);
				window.gameState.room.op(user, this.virus.op);
			}
		}
	}

	static generateName() {
		var names = [
			'EscapeFromMiniMars-[rObUt]',
			'TenkoseiRobo(SCeNe)',
			'DeathDeathEvolution-0D4yR3l34s3',
			'Micromancer_STEAM-LEAK',
			'Protocol on Blinding Lazer Weapons 20XX FULL GAME',
			'Flesh_Mess [SCaLPeL1911]',
			'Velocitron-NoCD',
			'Attack_on_RadMars-ROLODEX-RELEASE',
			'Grim_Gateway-SCeNe',
			'The.Brink-XDeaTH-EDITION',
			'SpaceJanitor-CustodialMarine--DPY',
			'Tessitron-CRaCKeD',
			'The.Uncertainty.Principle-HAX',
			'iZotope.Bigfoot-LEAK-SCeNe',
			'iZotope_Treasure-UNRELEASED',
			'iZotope.Brozone.6.[dOwngrAdE]',
			'RADEngine-LEAK[SCaLPeL1911]-RARE!!!',
		]
		return names.randomElement();
	}

	static generate() {
		var name = ExecutableFile.generateName();
		return new ExecutableFile(name);
	}

	static createKickVirus(user) {
		var file = new ExecutableFile(
			ExecutableFile.generateName(),
			{
				kick: user,
			}
		);
		console.log(user.name, " created an kick virus: ", file.name);
		return file;
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

