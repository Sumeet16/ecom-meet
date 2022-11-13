import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCMLgeY_Texo1ZGXx9MqmDuvcuK3d22bA0", // Add API Key
  databaseURL:"https://fir-cb93b-default-rtdb.firebaseio.com" // Add databaseURL
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  window.history.replaceState(null, "Meet", "?id=" + firepadRef.key + "&ref=user");
}

export default firepadRef;
