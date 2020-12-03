import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomVCModal from "../../Modal/CustomVCModal";
import TimelineWeekdayForm from "./TimelineWeekdayForm";
import TimelineTimeline from "./TimelineTimeline";
import TimelineWeekdaysAutoComplete from "./TimelineWeekdaysAutoComplete";
import TimelineTimeSlotWidget from "./TimelineTimeSlotWidget";
import TimelineExclusiveForm from "./TimelineExclusiveForm";

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    }
}));

export default function TimelineManageForm({ initWeekdays, initTimelines, initSpe, initExc, commitChanges }) {
    const classes = useStyles();
    const [weekdays, setWeekday] = useState(initWeekdays);
    const [timelines, setTimeline] = useState(initTimelines);
    const [specialTimelines, setSpecialTimeline] = useState(initSpe);
    const [excludes, setExclude] = useState(initExc);
    const [showSp, setShowSp] = useState(false);

    useEffect(() => {
        commitChanges({
            weekdays,
            timelines,
            specialTimelines,
            excludes
        });
    }, [weekdays, timelines, specialTimelines, excludes]);

    function handleWeekdaysChange(newWeekday) {
        setWeekday(newWeekday);
    }

    function modifySpecialTimeline(id, timelines) {
        if (timelines) {
            setSpecialTimeline({ ...specialTimelines, [id]: timelines });
        } else {
            var mySTL = { ...specialTimelines };
            delete mySTL[id];
            setSpecialTimeline(mySTL);
        }
    }

    function checkTimeslots() {
        if (timelines.length === 0) {
            return true;
        }
        for (var i = 0; i < timelines.length; i++) {
            if (timelines[i].from === "") {
                continue;
            }
            return false;
        }
        return true;
    }

    return <>
        <CustomVCModal body={() => (<TimelineWeekdayForm weekdays={weekdays} timeslots={timelines} specialTimeslots={specialTimelines} setSpecialTimeslot={modifySpecialTimeline} onHide={() => setShowSp(false)} />)} show={showSp} onHide={() => setShowSp(false)} />
        <TimelineWeekdaysAutoComplete weekdays={weekdays} setWeekday={handleWeekdaysChange} />
        <TimelineTimeSlotWidget initTimeslots={timelines} identifier={null} setTimeline={setTimeline} />
        { timelines.length > 0 ? (
            <Button variant="outlined" className={classes.button} color="primary" onClick={() => setShowSp(true)}>
                Manage Specific Weekday
            </Button>
        ) : ""}

        <TimelineExclusiveForm initExclude={initExc} commitExclude={setExclude} />
        {
            weekdays.length > 0 && !checkTimeslots() ? (
                <TimelineTimeline weekdays={weekdays} timelines={timelines} specialTimelines={specialTimelines} />
            ) : ""
        }
    </>;
}