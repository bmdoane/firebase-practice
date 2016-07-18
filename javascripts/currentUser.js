"use strict";

let firebase = require("./firebaseConfig"),
		// Allows for currentUser to be defined if it was not
		currentUser = null;


function getUser() {
	return currentUser;
}		

function setUser(user) {
	currentUser = user;
}

module.exports = {getUser, setUser};

