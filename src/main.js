"use strict"

var ld37 = {}

var user_index = 0
var User = function() {
	this.id = user_index++
	this.name = "RandomMook" + this.id
}

var Game = function() {
	this.lastTime = +new Date()
	this.updateCallback = this.update.bind(this)
	this.updateable = []
	this.users = []
}

Game.prototype.update = function(now) {
	var delta = now - this.lastTime
	this.lastTime = now

	// Do stuff.
	this.updateable.forEach(function(u) {
		u.update(delta)
	});

	// request another
	window.requestAnimationFrame(this.updateCallback)
}

Game.prototype.start = function() {
	window.requestAnimationFrame(this.updateCallback)

}


window.gameState = new Game()
window.gameState.start()
