"use strict"

var DownloadDialog = function() {
	this.dialog = $( "#download-dialog" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		autoOpen: true,
	});
	this.progress = $('.progress-bar', this.dialog).progressbar({value: 0});
}

DownloadDialog.prototype.start = function(file, callback) {
	this.total = 3000;
	this.tracker = 0;
	$('.filename', this.dialog).text(file);
	this.progress.progressbar({value: this.tracker, max: this.total});
	this.oncomplete = callback
}

DownloadDialog.prototype.update = function(time) {
	if(this.total > this.tracker) {
		this.tracker += time;
		this.progress.progressbar({value: this.tracker});
		if(this.total <= this.tracker) {
			this.oncomplete();
		}
	}
}



