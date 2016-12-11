"use strict"

var file_index = 0;
var File = function(name, icon) {
	this.id = file_index++;
	this.name = name
	this.icon = icon
}

File.prototype.launch = function() {
	alert("OMG VIRUSES");
}

var Desktop = function() {
	this.desktop = $('.desktop-area');
	this.files = [ ];
	this.addFile(new File('bob.exe', 'img/bones_icon.png'));
}

Desktop.prototype.addFile = function(file) {
	this.files.push(file);
	var element = $("<div class='launcher'>" +
			"<img src='" + file.icon + "' /> " +
			"<figcaption>" + file.name + "</figcaption> "+
		"</div>"
	);
	element.attr('unselectable', 'on')
		.css('user-select', 'none')
		.on('selectstart', false)
		.dblclick(file.launch.bind(file));
	this.desktop.append(element);
}
