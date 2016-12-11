"use strict"

var DownloadDialog = function(desktop) {
	this.dialog = $( "#download-dialog" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		appendTo: $('.desktop-area'),
		autoOpen: false,
	});
	this.desktop = desktop;
	this.progress = $('.progress-bar', this.dialog).progressbar({value: 0});
}

DownloadDialog.prototype.start = function(file, callback) {
	this.total = 800;
	this.tracker = 0;
	this.currentFile = file;
	this.dialog.dialog('open');
	$('.filename', this.dialog).text(file.name);
	this.progress.progressbar({value: this.tracker, max: this.total});
	this.oncomplete = callback
	this.extra();
}

DownloadDialog.prototype.close = function() {
	this.dialog.dialog("close");
}

DownloadDialog.prototype.extra = function(extra) {
	if(!extra) {
		$('.extra', this.dialog).empty();
	}
	else {
		$('.extra', this.dialog).append(extra);
	}
}

DownloadDialog.prototype.update = function(time) {
	if(this.currentFile && this.total > this.tracker) {
		this.tracker += time;
		this.progress.progressbar({value: this.tracker});
		if(this.total <= this.tracker) {
			this.extra("All done!");
			this.desktop.addFile(this.currentFile);
			this.currentFile = null;
			var self = this;

			window.setTimeout(function() {
				self.close("close")
			}, 1000);

			this.oncomplete();
		}
	}
}



