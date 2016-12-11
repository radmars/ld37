"use strict"

var Desktop = function() {
	this.desktop = $('.desktop-area');
	this.files = [ ];
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
