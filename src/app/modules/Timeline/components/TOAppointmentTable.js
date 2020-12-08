import React, {useEffect, useState} from "react";
import TimelineOngoingAppointmentWidget from "./TOAppointmentWidget";

export default function TimelineOngoingAppointmentTable({appointments, login, handleDelete}) {
    const [sortedAppointments, setSortedAppointments] = useState([]);

    useEffect(() => {
        var apps = [...appointments];
        apps.sort((a, b) => {
            const compare = a.date.localeCompare(b.date);
            if (compare === 0) {
                return a.timeline.from.localeCompare(b.timeline.from);
            }
            return compare;
        });
        var result = [];
        var currentDate = apps[0].date;
        var currentArr = [apps[0]];
        for (var i = 1; i < apps.length; i++) {
            if (apps[i].date === currentDate) {
                currentArr.push(apps[i]);
            } else {
                result.push({
                    date: currentDate,
                    apps: currentArr
                });
                currentDate = apps[i].date;
                currentArr = [apps[i]];
            }
        }
        result.push({
            date: currentDate,
            apps: currentArr
        });
        setSortedAppointments(result);
    }, [appointments])

    return <div className="hideScrollBar" style={{overflowX: "scroll", whiteSpace: "nowarp"}}>
        <table className="table" style={{display: "inline-block"}}>
            <thead>
                <tr>
                    {
                        sortedAppointments.map((sp, index) => (
                            <th key={index} className="text-center" scope="col">{sp.date}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        sortedAppointments.map((sp, index) => (
                            <td key={index} scope="col">
                                <div className="d-flex flex-column">
                                    {
                                        sp.apps.map((app, index) => (
                                            <TimelineOngoingAppointmentWidget key={index} handleDelete={handleDelete} appointmentObj={app} isYou={app.advisor.login === login} />
                                        ))
                                    }
                                </div>
                            </td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    </div>
}