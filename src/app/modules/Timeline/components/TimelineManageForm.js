import React, { useState } from "react";
import TimelineDateField from "./TimelineDateField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CustomVCModal from "../../Modal/CustomVCModal";
import TimelineWeekdayForm from "./TimelineWeekdayForm";
import TimelineTimeline from "./TimelineTimeline";
import TimelineWeekdaysAutoComplete from "./TimelineWeekdaysAutoComplete";
import TimelineTimeSlotWidget from "./TimelineTimeSlotWidget";

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    }
}));

export default function TimelineManageForm() {
    const classes = useStyles();
    const [weekdays, setWeekday] = useState([]);
    const [timelines, setTimeline] = useState([]);
    const [specialTimelines, setSpecialTimeline] = useState({});
    const [excluedes, setExcluede] = useState([]);
    const [showSp, setShowSp] = useState(false);

    function handleWeekdaysChange(newWeekday) {
        if (newWeekday.length < weekdays.length) {
            weekdays.forEach((weekday) => {
                if (!newWeekday.includes(weekday)) {
                    delete specialTimelines[weekday.title];
                    setWeekday(newWeekday);
                    return;
                }
            })
        } else {
            setWeekday(newWeekday)
        }
    }

    function modifySpecialTimeline(type, id, timelines) {
        //type 0 weekdays
        if (type === 0) {
            if (timelines) {
                setSpecialTimeline({...specialTimelines, [id]: timelines});
            } else {
                var mySTL = {...specialTimelines};
                delete mySTL[id];
                setSpecialTimeline(mySTL);
            }
            
        } else {    //type 1 days
            // todo set exc days
        }
    }

    function addExcluede() {
        setExcluede([...excluedes, excluedes.length + 1]);
    }
    function submit() {
        console.log("timeslots", timelines);
        console.log("spc timeslots", specialTimelines);
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
        <CustomVCModal body={() => (<TimelineWeekdayForm weekdays={weekdays} timeslots={timelines} specialTimeslots={specialTimelines} setSpecialTimeslot={modifySpecialTimeline} />)} show={showSp} onHide={() => setShowSp(false)} />
        <TimelineWeekdaysAutoComplete weekdays={weekdays} setWeekday={handleWeekdaysChange} />
        <TimelineTimeSlotWidget initTimeslots={timelines} identifier={null} setTimeline={setTimeline} />
        { timelines.length > 0 ? (
            <Button variant="outlined" className={classes.button} color="primary" onClick={() => setShowSp(true)}>
                Manage Specific Day
            </Button>
        ) : ""}

        <Button variant="outlined" color="secondary" onClick={(() => addExcluede())} className={classes.button}>
            + Exclude Time
        </Button>
        {
            excluedes.length > 0 ? (
                <div className="row">
                    {
                        excluedes.map(value => (
                            <TimelineDateField key={value} className="col-lg-4 px-3" />
                        ))
                    }
                </div>
            ) : ""

        }
        <Button variant="outlined" color="secondary" onClick={(() => submit())} className={classes.button}>
            Submit
        </Button>
        {
            weekdays.length > 0 && !checkTimeslots() ? (
                <TimelineTimeline weekdays={weekdays} timelines={timelines} specialTimelines={specialTimelines} />
            ) : ""
        }
    </>;
}