import React, { useState } from "react";
import TimelineTimeSlot from "./TimelineTimeSlot";
import TimelineDurationField from "./TimelineDurationField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    }
}));

export default function TiemlineTimeSlotWidget({initTimeslots, identifier, setTimeline}) {
    const classes = useStyles();
    const [timeslots, setTimeslot] = useState(initTimeslots);
    const [duration, setDuration] = useState(60);
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
        if (timeslots.length < 2) {
            return timeslots;
        }
        var sortedTimelines = quickSort(timeslots, 0, timeslots.length - 1);
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
        var timelines = timeslotsMerge();
        var hour = 0;
        var min = duration;
        while (min >= 60) {
            min -= 60;
            hour += 1;
        }
        var result = [];
        for (var i = 0; i < timelines.length; i++) {
            var from = timelines[i].from;
            var to = timelines[i].to;
            while (timeAddition(from, hour, min, to) !== false) {
                const end = timeAddition(from, hour, min, to);
                result.push({ from, to: end });
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
        setTimeslot([...timeslots, { from: "", to: "" }]);
    }
    function modifyTimeslot(pos, newValue) {
        var myTimeslots = [...timeslots];
        myTimeslots[pos] = { ...myTimeslots[pos], ...newValue };
        setTimeslot(myTimeslots);
        setTlcWarn(checkTimeslotConflict(myTimeslots));
    }
    function handleDelete(index) {
        var myTimeslots = [...timeslots];
        myTimeslots.splice(index, 1)
        setTimeslot(myTimeslots);
    }

    return <>
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
        <Button variant="outlined" color="secondary" onClick={(() => addTimeslot())} className={classes.button}>
            + Timeslots
        </Button>
        {
            timeslots.map((value, index) => (
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
            timeslots.length > 0 ? (
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
                </>
            ) : ""
        }
    </>;
}