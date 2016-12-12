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

	onDownloadFinished(user) {
	}

	static generateNewFile() {
		var types = [ExecutableFile, MusicFile, KeygenFile, TextFile]
		var newType = types.randomElement();
		return newType.generate()
	}
}
