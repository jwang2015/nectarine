import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "nectari.me";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
    "1": {
      "_id": 1,
      "name": "Initial User",
      "email": "user@email.com",
      "password": "password",
      "image": "img/profile-temp.jpg",
      "cloud_services": {
        "dropbox": 1
      }
    }
  },
  "cloud_services": {
    "1": {
      "_id": 1,
      "token": 234234534,
      "expiry": 1435365643564
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

export function removeDocument(collectionName, oldDoc) {
  var collection = data[collectionName];
  var targetId = Object.keys(collection).length - 1;
  while (collection[targetId]) {
    targetId++;
  }
  oldDoc._id = undefined;
  writeDocument(collectionName, oldDoc);
  return oldDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

if (document.getElementById('db-reset') !== null) {
  ReactDOM.render(
    <ResetDatabase />,
    document.getElementById('db-reset')
  );
}
