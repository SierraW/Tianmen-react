import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const em_company = db.collection("em_company");
const em_chat = db.collection("em_chat");
const em_addOn = db.collection("em_addo");
const em_project = db.collection("em_proj");
const em_tl = db.collection("em_timeline");
const em_ap = db.collection("em_appointment");

function em_room(roomId) {
	return em_chat.doc(roomId);
}

function em_mashaji(roomId) {
	return em_chat.doc(roomId).collection("em_messages");
}

function em_aida(roomId) {
	return em_chat.doc(roomId).collection("em_addons");
}

function em_payment(roomId) {
	return em_chat.doc(roomId).collection("em_payment");
}

function em_timeline(user_login) {
	return em_tl.doc(user_login);
}

function em_appointment(manager_login=null) {
	if (manager_login) {
		return em_ap.where("advisor_login" , "==", manager_login);
	} else {
		return em_ap;
	}
}

function timestamp(date = new Date()) {
	return firebase.firestore.Timestamp.fromDate(date);
}

export {
	db,
	em_company,
	em_addOn,
	em_project,
	em_chat,
	em_tl,
	em_timeline,
	em_appointment,
	em_aida,
	em_payment,
	em_room,
	em_mashaji,
	timestamp
};
