import React, { useState, useEffect } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { useSelector } from "react-redux";
import ChatPage from "../components/ChatPage";
import { em_room } from "../../../../services/firebaseInit";
import axios from "axios";

export const CustomerSupportPage = () => {
    const suhbeader = useSubheader();
    const [loading, setLoading] = useState(true);
    const [attendees, setAttendee] = useState([]);
    const [roomName, setRoomName] = useState("");
    const [userInfo, setUserInfo] = useState({});
    var updateUserInfoArr = [];

    suhbeader.setTitle("Support");

    const { id } = useSelector((state) => state.cs);
    const uid = useSelector((state) => state.auth.user.id);
    const session = useSelector((state) => state.auth.user_session);

    useEffect(() => {
        enableLoading();
        var unsubscribe = em_room(id).onSnapshot(doc => {
            setAttendee(doc.data().attendees);
            setRoomName(doc.data().name)
        })
        setTimeout(() => {
            disableLoading();
        }, 2000);
        return function cleanup() {
            unsubscribe();
        };
    }, [])

    useEffect(() => {
        attendees.forEach(aid => {
            if (!userInfo[aid]) {
                updateUserInfoArr.push(aid);
            }
        })

        axios.get(`http://tianmengroup.com/server/socket/getDisplayName.php?uid=${JSON.stringify(updateUserInfoArr)}&multiple=true`)
            .then(({ data }) => {
                var newUserInfos = [];
                data.data.forEach(uInfo => {
                    newUserInfos[uInfo.id] = {
                        name: uInfo.display_name,
                        title: uInfo.title_name,
                        head: uInfo.head,
                        company: uInfo.company_name,
                        com_id: uInfo.com_id
                    }
                })
                setUserInfo({
                    ...userInfo, ...newUserInfos
                });
            })
        updateUserInfoArr = [];
    }, [attendees]);

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    function clientAttendee() {
        console.log("uinfo", userInfo);
        return attendees ? attendees.filter(userId => userInfo[userId] ? userInfo[userId].com_id !== "1" : false) : [];
    }

    function fsAttendee() {
        return attendees ? attendees.filter(userId => userInfo[userId] ? userInfo[userId].com_id === "1" : false) : [];
    }

    function getHeadUri(user) {
        if (user && user.head !== null) {
            return `http://tianmengroup.com/server/heads/${user.head}`;
        } else {
            return `http://tianmengroup.com/server/heads/blank.png`;
        }
    }

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            {/* begin::Row */}
            <div className="row">
                <div className="col-lg-4">
                    <div className="card card-stretch gutter-b">
                        <div className="card-body">
                            {/* Clients */}
                            <table className="table table-head-custom table-vertical-center" >
                                <thead>
                                    <tr className="text-left">
                                        <th className="pr-0" style={{ width: "90px" }}>Clients</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientAttendee().map((attendee, index) => (
                                        <tr key={index}>
                                            <td className="pr-0">
                                                <div className="symbol symbol-50 symbol-light mt-1">
                                                    <span className="symbol-label">
                                                        <img src={getHeadUri(userInfo[attendee])} className="h-75 align-self-center" alt="user" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="pl-0">
                                                <span className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{userInfo[attendee].name}</span>
                                                <span className="text-muted font-weight-bold text-muted d-block">{userInfo[attendee].title}</span>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                            {/* FS */}
                            <table className="table table-head-custom table-vertical-center" >
                                <thead>
                                    <tr className="text-left">
                                        <th className="pr-0" style={{ width: "90px" }}>Finestudio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fsAttendee().map((attendee, index) => (
                                        <tr key={index}>
                                            <td className="pr-0">
                                                <div className="symbol symbol-50 symbol-light mt-1">
                                                    <span className="symbol-label">
                                                        <img src={getHeadUri(userInfo[attendee])} className="h-75 align-self-center" alt="user" />
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="pl-0">
                                                <span href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{userInfo[attendee] ? userInfo[attendee].name : ""}</span>
                                                <span className="text-muted font-weight-bold text-muted d-block">{userInfo[attendee] ? userInfo[attendee].title : ""}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card card-stretch gutter-b">
                        <ChatPage userInfo={userInfo} roomName={roomName} roomId={id} uid={uid} session={session} />
                    </div>
                </div>
            </div>

        </>;
    }

};