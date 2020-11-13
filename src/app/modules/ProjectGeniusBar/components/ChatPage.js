import React, { useState, useEffect, useRef } from "react";
import { datePrettyPrint } from "../../../../services/datePrintingService";
import { em_mashaji, timestamp } from "../../../../services/firebaseInit";
import axios from "axios";
import "../style/home.css";
import PropTypes from "prop-types";


export default function ChatPage({ roomName, roomId, uid, session, userInfo }) {

    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    var map = {};
    const buttonRef = useRef();

    var scrollToBottom = () => {
        if (buttonRef.current.scrollIntoView) {
            buttonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }
    }

    function sendMessage(body = null, type = null) {
        if (!body && /$\s*^/.test(inputMsg)) {
            alert("no empty message allowed");
            setInputMsg("");
            return;
        }
        em_mashaji(roomId).add({
            display: true,
            message: body ? body : inputMsg,
            sender: uid,
            time: timestamp(),
            type: type ? type : 1
        })
            .then(() => {
                setInputMsg("");
            })
            .catch((err) => {
                console.log("error", err);
            })
    }

    function handleChange(event) {
        setInputMsg(event.target.value);
    }

    useEffect(() => {
        em_mashaji(roomId).orderBy("time").onSnapshot((querySnapshot) => {
            var items = []
            querySnapshot.forEach((doc) => {
                items.push({
                    display: doc.data().display,
                    message: doc.data().message,
                    sender: doc.data().sender,
                    align: doc.data().sender === uid ? "align-items-end" : "align-items-start",
                    time: datePrettyPrint(doc.data().time.toDate()),
                    type: doc.data().type
                })
            })
            setMessages(items);
            scrollToBottom();
        })
    }, [])

    function keyListner(e) {
        if (e.keyCode === 13 || e.keyCode === 17) {
            map[e.keyCode] = e.type == 'keydown';
        }
        if (e.keyCode === 13 && e.type === 'keydown') {
            if (map[17]) {
                setInputMsg(inputMsg + "\r\n");
                return;
            }
            e.preventDefault();
            sendMessage();
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function renderMessage(type, msgBody) {
        switch (type) {
            case 1:
                return <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">{msgBody}</div>
            case 2:
                return <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px"><a href={msgBody} target="_blank" style={{ background: `url(${msgBody})`, backgroundRepeat: 'no-repeat', display: 'inline-block', overflow: 'hidden', width: '200px', height: '100px', backgroundSize: 'cover' }}></a></div>
            case 3:
                return <div className="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px"><a href={msgBody} download>附件: {msgBody}</a></div>;
        }
    }

    function headUri(data) {
        if (data && data.head !== null) {
            return `http://tianmengroup.com/server/heads/${data.head}`;
        } else {
            return `http://tianmengroup.com/server/heads/blank.png`;
        }
    }

    function nameString(data) {
        if (data) {
            return data.name;
        } else {
            return "";
        }
    }

    const uploadFile = (event) => {
        const file = event.target.files[0];

        let formData = new FormData();
        formData.append("file", file);
        formData.append("session", session);
        formData.append("target", "uploads");

        setTimeout(() => {
            axios
                .post("http://tianmengroup.com/server/universalUpload.php", formData)
                .then(({ data }) => {
                    if (data.success === "success") {
                        sendMessage( data.uri, data.type);
                    } else {
                        alert(data.message);
                    }
                })
                .catch(() => {
                    alert("Upload failed");
                });
        }, 1000)


    }


    return <>
        <div className="card-header align-items-center px-4 py-3">
            <div className="text-left flex-grow-1">
                <button type="button" className="btn btn-clean btn-sm btn-icon btn-icon-md d-lg-none" id="kt_app_chat_toggle">
                    <span className="svg-icon svg-icon-lg">

                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <rect x="0" y="0" width="24" height="24" />
                                <path d="M18,2 L20,2 C21.6568542,2 23,3.34314575 23,5 L23,19 C23,20.6568542 21.6568542,22 20,22 L18,22 L18,2 Z" fill="#000000" opacity="0.3" />
                                <path d="M5,2 L17,2 C18.6568542,2 20,3.34314575 20,5 L20,19 C20,20.6568542 18.6568542,22 17,22 L5,22 C4.44771525,22 4,21.5522847 4,21 L4,3 C4,2.44771525 4.44771525,2 5,2 Z M12,11 C13.1045695,11 14,10.1045695 14,9 C14,7.8954305 13.1045695,7 12,7 C10.8954305,7 10,7.8954305 10,9 C10,10.1045695 10.8954305,11 12,11 Z M7.00036205,16.4995035 C6.98863236,16.6619875 7.26484009,17 7.4041679,17 C11.463736,17 14.5228466,17 16.5815,17 C16.9988413,17 17.0053266,16.6221713 16.9988413,16.5 C16.8360465,13.4332455 14.6506758,12 11.9907452,12 C9.36772908,12 7.21569918,13.5165724 7.00036205,16.4995035 Z" fill="#000000" />
                            </g>
                        </svg>

                    </span>
                </button>


            </div>
            <div className="text-center text-center">
                <div className="symbol-group symbol-hover justify-content-center">
                    <h3 style={{ margin: "1.2 rem" }}>{roomName}</h3>
                </div>
            </div>

        </div>


        <div className="card-body">

            <div className="scrollable">

                <div className="messages">

                    {messages.map((message, index) => (
                        <div className={`d-flex flex-column mb-5 ${message.align}`} key={index}>
                            <div className="d-flex align-items-center">
                                <div className="symbol symbol-circle symbol-35 mr-3">
                                    <img alt="Pic" src={headUri(userInfo[message.sender])} />
                                </div>
                                <div>
                                    <a href="#" className="text-dark-75 text-hover-primary font-weight-bold font-size-h6 mr-3">{nameString(userInfo[message.sender])}</a>
                                    <span className="text-muted font-size-sm">{message.time}</span>
                                </div>
                            </div>

                            {renderMessage(message.type, message.message)}

                        </div>
                    ))}

                </div>

                <div style={{ float: "left", clear: "both" }}
                    ref={buttonRef}>
                </div>

            </div>

        </div>


        <div className="card-footer align-items-center">


            <textarea className="form-control border-0 p-0" rows="2" placeholder="Type a message" onKeyDown={(event) => keyListner(event)} onKeyUp={(event) => keyListner(event)} value={inputMsg} onChange={(event) => handleChange(event)} id="txtIn"></textarea>
            <div className="d-flex align-items-center justify-content-between mt-5">
                <div className="mr-3">

                    {/* <div>
                        <input id="file" type="file" name="file" accept=".png, .jpg, .jpeg, .gif, .pdf, .pages, .doc, .docx, .zip" onchange="angular.element(this).scope().uploadFile(this.files)" />
                    </div> */}

                    <input
                        type="file"
                        name="file"
                        accept=".png, .jpg, .jpeg, .gif, .pdf, .pages, .doc, .docx, .zip"
                        onChange={uploadFile}
                    />

                    {/* <a href="#" className="btn btn-clean btn-icon btn-md mr-1">
                        <i className="flaticon2-photograph icon-lg"></i>
                    </a>
                    

                    <a href="#" className="btn btn-clean btn-icon btn-md">
                        <i className="flaticon2-photo-camera icon-lg"></i>
                    </a> */}

                </div>
                <div>
                    <button type="button" className="btn btn-primary btn-md text-uppercase font-weight-bold chat-send py-2 px-6" onClick={() => sendMessage()}>Send</button>
                </div>
            </div>



        </div>
    </>


}

ChatPage.propTypes = {
    roomName: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    uid: PropTypes.number.isRequired,
    session: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired
}
