import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const em_chat = db.collection("em_chat");

function em_room(roomId) {
  return em_chat.doc(roomId);
}

function em_mashaji(roomId) {
  return em_chat.doc(roomId).collection("em_messages");
}

function timestamp(date = new Date()) {
  return firebase.firestore.Timestamp.fromDate(date);
}

export {
  db,
  em_room,
  em_mashaji,
  timestamp
};
