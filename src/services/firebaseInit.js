import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const em_chat = db.collection("em_chat");
const em_addOn = db.collection("em_addo");
const em_project = db.collection("em_proj");

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
  em_addOn,
  em_project,
  em_chat,
  em_room,
  em_mashaji,
  timestamp
};
