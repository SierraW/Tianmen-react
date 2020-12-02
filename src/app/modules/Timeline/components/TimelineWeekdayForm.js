import React from "react";
import TimelineWeekdaySec from "./TimelineWeekdaySec";
import Typography from '@material-ui/core/Typography';

export default function TimelineWeekdayForm({weekdays, timeslots}) {

    function checkTimeslots() {
        if (timeslots.length === 0) {
            return true;
        }
        for (var i = 0; i < timeslots.length; i++) {
            if (timeslots[i].from === "") {
                continue;
            }
            return false;
        }
        return true;
    }

    return <>
    {
        weekdays.length === 0 ? (
            <Typography>You dont have any weekday set up.</Typography>
        ) : ""
    }
    {
        checkTimeslots() ? (
            <Typography>You dont have any timeslot set up.</Typography>
        ) : ""
    }
    {
        weekdays.length > 0 && !checkTimeslots() ? (
            <>
            {
                weekdays.map((weekday, index) => (
                    <TimelineWeekdaySec key={index} name={weekday} timeslots={timeslots} />
                ))
            }
            </>
        ) : ""
    }
    </>;
}