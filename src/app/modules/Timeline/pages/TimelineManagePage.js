import React, { useEffect, useState } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import TimelineManageForm from "../components/TimelineManageForm";
import { em_timeline } from "../../../../services/firebaseInit";
import { useSelector } from "react-redux";

export function TimelineManagePage() {
    const [loading, setLoading] = useState(true);
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
    }, [user.user_login]);

    function commitChanges(timelineObj) {
        if (firstTime) {
            firstTime = false;
            return;
        }

        if (user.title_id === 1 || user.title_id === 6) {
            em_timeline(user.user_login).set(timelineObj)
                .then(() => {})
                .catch(() => {
                    alert("Network Error: failed to connect to database.")
                })
        }
    }


    return <>
        <div className="row">
            <div className="col-lg-12 card card-body">
                {
                    loading ? (
                        <div className="card card-body">
                            <Skeleton animation="wave" variant="rect" height={200} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </div>
                    ) : (
                            <TimelineManageForm initWeekdays={initWeekdays} initTimelines={initTimelines} initSpe={initSpe} initExc={initExc} commitChanges={commitChanges} />
                        )
                }
            </div>
        </div>
    </>;
}