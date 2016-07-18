"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig"),
    fb = require("./fb-getter"),
    fbData = fb();

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

// // Read
// function getSongs() {
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: 'https://another-cd91e.firebaseio.com/.json'

// 		}).done(function(songData) {
// 			resolve(songData);
// 		});
// 	});
// }
// //Create
// function addSong(songFormObj) {
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: 'https://another-cd91e.firebaseio.com/Songs.json',
// 			method: "POST",
// 			data: JSON.stringify(songFormObj),
// 			dataType: "json"
// 		}).done(function(songId) {
// 			resolve(songId);
// 		});
// 	});
// }
// // Delete
// function deleteSong(songId) {
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: `https://another-cd91e.firebaseio.com/Songs/${songId}.json`,
// 			method: "DELETE"
// 		}).done(function() {
// 			resolve();
// 		});
// 	});

// }
// // Edit 1 - adding songID to url
// function getSong(songId) {
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: `https://another-cd91e.firebaseio.com/Songs/${songId}.json`,
// 		}).done(function(songData) {
// 			resolve(songData);
// 		});
// 	});	

// }
// // Edit 2
// function editSong(songFormObj, songId) {
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: `https://another-cd91e.firebaseio.com/Songs/${songId}.json`,
// 			method: "PUT",
// 			data: JSON.stringify(songFormObj)
// 		}).done(function(data) {
// 			resolve(data);
// 		});
// 	});
// }

// module.exports = {
//   getSongs,
//   addSong,
//   getSong,
//   deleteSong,
//   editSong
// };

// ****************************************
// DB interaction using Firebase SDK
// ****************************************
// Set up listener to grab value of Songs and see if anything has happened to it
// .ref and .val are firebase methods
function getSongs(callback, userId) {
	console.log("userId", userId);
	// This next line could go up top and songs be used multiple times
	let songs = firebase.database().ref('Songs');
	// The next line you can use these methods with SDK
	songs.orderByChild("uid").equalTo(userId).on('value', function(songData) {
		console.log("something happened");
		callback(songData.val());
	});
}

// Push is a firebase method - returns promise
function addSong(newSong) {
	return firebase.database().ref('Songs').push(newSong);
}

// Clues for the remaining functions.  Remove. Once. Update.

function deleteSong(songId) {
	return firebase.database().ref(`Songs/${songId}`).remove();
}

function getSong(songId) {
	console.log("songId", songId);
	return firebase.database().ref(`Songs/${songId}`);
}
// This is not confirmed
function editSong(songFormObj, songId) {
	console.log("song in EditSong", songId);
	return firebase.database().ref(`Songs/${songId}`).update(songFormObj);

}
module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};