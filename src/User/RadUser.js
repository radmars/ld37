"use strict"

class RadUser extends User {
	constructor() {
		super();
		this.name = "RADMARS";
		this.status = 3;
	}

	op() {
	}

	deop() {
	}

	update() {
	}

	canControl() {
		return false;
	}
}
