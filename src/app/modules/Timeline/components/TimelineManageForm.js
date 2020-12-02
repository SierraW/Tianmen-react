import React, { useState } from "react";
import TimelineWeekdaysAutoComplete from "./TimelineWeekdaysAutoComplete";
import TimelineTimeSlot from "./TimelineTimeSlot";
import TimelineDurationField from "./TimelineDurationField";
import TimelineDateField from "./TimelineDateField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Zoom from '@material-ui/core/Zoom';
import CustomVCModal from "../../Modal/CustomVCModal";
import TimelineWeekdayForm from "./TimelineWeekdayForm";
import TimelineTimeline from "./TimelineTimeline";

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        width: "40%"
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    }
}));

export default function TimelineManageForm() {
    const classes = useStyles();
    const [weekdays, setWeekday] = useState([]);
    const [timelines, setTimeslot] = useState([]);
    const [excluedes, setExcluede] = useState([]);
    const [duration, setDuration] = useState(60);
    const [showSp, setShowSp] = useState(false);
    const [tlcWarning, setTlcWarn] = useState(false);

    function swap(items, leftIndex, rightIndex) {
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }

    function partition(items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            while (items[i].from < pivot.from) {
                i++;
            }
            while (items[j].from > pivot.from) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    function quickSort(items, left, right) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right);
            if (left < index - 1) {
                quickSort(items, left, index - 1);
            }
            if (index < right) {
                quickSort(items, index, right);
            }
        }
        return items
    }

    function timeslotsMerge() {
        if (timelines.length < 2) {
            return timelines;
        }
        var sortedTimelines = quickSort(timelines, 0, timelines.length - 1);
        var from = sortedTimelines[0].from;
        var to = sortedTimelines[0].to;
        var result = [];
        for (var i = 1; i < sortedTimelines.length; i++) {
            if (from === "") {
                from = sortedTimelines[i].from;
                to = sortedTimelines[i].to;
                continue;
            }
            if (compareTime(sortedTimelines[i].from, to)) {
                result.push({ from, to });
                from = sortedTimelines[i].from;
                to = sortedTimelines[i].to;
            } else {
                if (compareTime(sortedTimelines[i].to, to)) {
                    to = sortedTimelines[i].to;
                }
            }
        }
        if (from !== "") {
            result.push({ from, to });
        }
        setTimeslot(result);
        setTlcWarn(false);
        return result;
    }

    function checkTimeslotConflict(timelines) {
        if (timelines.length < 2) {
            return false;
        }
        var sortedTimelines = quickSort([...timelines], 0, timelines.length - 1);
        var timeline = sortedTimelines[0];
        for (var i = 1; i < sortedTimelines.length; i++) {
            if (timeline.from === "") {
                timeline = sortedTimelines[i];
                continue;
            }
            if (compareTime(timeline.to, sortedTimelines[i].from)) {
                return true;
            } else {
                timeline = sortedTimelines[i];
            }
        }
        return false
    }

    function splitTime() {
        var timeslots = timeslotsMerge();
        var hour = 0;
        var min = duration;
        while (min >= 60) {
            min -= 60;
            hour += 1;
        }
        var result = [];
        for (var i = 0; i < timeslots.length; i++) {
            var from = timeslots[i].from;
            var to = timeslots[i].to;
            while (timeAddition(from, hour, min, to) !== false) {
                console.log("here");
                const end = timeAddition(from, hour, min, to);
                result.push({from, to: end});
                from = end;
            }
        }
        setTimeslot(result);
    }

    function timeAddition(time, hour, min, limit) {
        const timeArr = time.split(":");
        var resultHour = parseInt(timeArr[0]) + hour;
        var resultMin = parseInt(timeArr[1]) + min;
        while (resultMin >= 60) {
            resultHour += 1;
            resultMin -= 60;
        }
        const resultTime = `${resultHour < 10 ? `0${resultHour}` : resultHour}:${resultMin < 10 ? `0${resultMin}` : resultMin}`;
        return compareTime(resultTime, limit) ? false : resultTime; 
    }

    function compareTime(lhs, rhs) {
        if (lhs === "" || rhs === "") {
            return false;
        }
        const lhsArr = lhs.split(":");
        const rhsArr = rhs.split(":");
        if (lhsArr[0] > rhsArr[0] || lhsArr[0] === rhsArr[0] && lhsArr[1] > rhsArr[1]) {
            return true;
        }
        return false;
    }

    function addTimeslot() {
        setTimeslot([...timelines, { from: "", to: "" }]);
    }
    function modifyTimeslot(pos, newValue) {
        var myTimeslots = [...timelines];
        myTimeslots[pos] = { ...myTimeslots[pos], ...newValue };
        setTimeslot(myTimeslots);
        setTlcWarn(checkTimeslotConflict(myTimeslots));
    }
    function addExcluede() {
        setExcluede([...excluedes, excluedes.length + 1]);
    }
    function submit() {
        console.log("timeslots", timelines);
    }
    function handleDelete(index) {
        var myTimeslots = [...timelines];
        myTimeslots.splice(index, 1)
        setTimeslot(myTimeslots);
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
        <CustomVCModal body={() => (<TimelineWeekdayForm weekdays={weekdays} timeslots={timelines} />)} show={showSp} onHide={() => setShowSp(false)} />
        {
            tlcWarning ? (
                <Zoom in={tlcWarning}>
                    <Alert className="mb-3" severity="warning">
                        <AlertTitle>Timeline Merging</AlertTitle>
                    Your timelines have one or more conflict(s), they will be merge at submit.
                    </Alert>
                </Zoom>
            ) : ""
        }
        <TimelineWeekdaysAutoComplete weekdays={weekdays} setWeekday={setWeekday} />
        <Button variant="outlined" color="secondary" onClick={(() => addTimeslot())} className={classes.button}>
            + Timeslots
        </Button>
        {
            timelines.map((value, index) => (
                <TimelineTimeSlot
                    key={index}
                    initFrom={value.from}
                    initTo={value.to}
                    commitValue={(val) => modifyTimeslot(index, val)}
                    handleDelete={() => handleDelete(index)}
                />
            ))
        }
        {
            timelines.length > 0 ? (
                <>
                    {
                        tlcWarning ? (
                            <Zoom in={tlcWarning} className={classes.button}>
                                <Button variant="outlined" color="primary" onClick={(() => timeslotsMerge())} >
                                    Auto Fix Conflict
                                </Button>
                            </Zoom>
                        ) : ""
                    }
                    <TimelineDurationField duration={duration} setDuration={setDuration} />
                    <Button variant="outlined" className={classes.button} color="primary" onClick={(() => splitTime())}>
                        Auto Split Based On Duration
                    </Button>
                    <Button variant="outlined" className={classes.button} color="primary" onClick={(() => setShowSp(true))}>
                        Manage Specific Day
                    </Button>
                </>
            ) : ""
        }
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
                <div className="d-flex">
                    {
                        weekdays.map((weekday, index) => (
                            <div key={index} className="p-6">
                                <TimelineTimeline timelines={timelines} weekday={weekday} />
                            </div>
                        ))
                    }
                </div>
            ) : ""
        }
    </>;
}