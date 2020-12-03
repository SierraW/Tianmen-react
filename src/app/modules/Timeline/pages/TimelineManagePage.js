import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import TimelineManageForm from "../components/TimelineManageForm";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { em_timeline } from "../../../../services/firebaseInit";
import { useSelector } from "react-redux";

export function TimelineManagePage() {
    const suhbeader = useSubheader();
    const [loading, setLoading] = useState(true);
    suhbeader.setTitle("Timeline Management");
    const [initWeekdays, setInitWeekday] = useState([]);
    const [initTimelines, setInitTimeline] = useState([]);
    const [initSpe, setInitSpe] = useState({});
    const [initExc, setInitExc] = useState([]);
    const user = useSelector((state) => state.auth.user);
    var firstTime = true;

    useEffect(() => {
        em_timeline(user.user_login).get().then((doc) => {
            if (doc.exists) {
                setInitWeekday(doc.data().weekdays);
                setInitTimeline(doc.data().timelines);
                setInitSpe(doc.data().specialTimelines);
                setInitExc(doc.data().excludes);
            }
            setLoading(false);
        });
    }, [])

    function commitChanges(timelineObj) {
        if (firstTime) {
            firstTime = false;
            return;
        }

        if (user.title_id === 1 || user.title_id === 6) {
            em_timeline(user.user_login).set(timelineObj, { merge: true })
                .catch(() => {
                    alert("Network Error: failed to connect to database.")
                })
        }
    }


    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="row">
                <div className="col-lg-12 card card-body">
                    <TimelineManageForm initWeekdays={initWeekdays} initTimelines={initTimelines} initSpe={initSpe} initExc={initExc} commitChanges={commitChanges} />
                </div>
            </div>
        </>;
    }
}