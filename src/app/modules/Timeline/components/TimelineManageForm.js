import React, { useState } from "react";
import TimelineWeekdaysAutoComplete from "./TimelineWeekdaysAutoComplete";
import TimelineTimeSlot from "./TimelineTimeSlot";
import TimelineDurationField from "./TimelineDurationField";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        width: "30%"
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    }
}));

export default function TimelineManageForm() {
    const classes = useStyles();
    const [timeslots, setTimeslot] = useState([]);
    const [excluedes, setExcluede] = useState([]);
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
        console.log(result);
        setTimeslot(result);
        return result;
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
    }
    function addExcluede() {
        setExcluede([...excluedes, excluedes.length + 1]);
    }
    function submit() {
        console.log("timeslots", timeslots);
    }
    function handleDelete(index) {
        var myTimeslots = [...timeslots];
        myTimeslots.splice(index, 1)
        setTimeslot(myTimeslots);
    }

    return <>
        {
            tlcWarning ? (
                <Alert className="mb-3" severity="warning">
                    <AlertTitle>Timeline Merging</AlertTitle>
                    Your timelines have one or more conflict(s), they will be merge at submit.
                </Alert>
            ) : ""
        }
        <TimelineWeekdaysAutoComplete />
        <TimelineDurationField duration={duration} setDuration={setDuration} />
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
                <Button variant="outlined" color="primary" onClick={(() => timeslotsMerge())} className={classes.button}>
                    Auto Fix
                </Button>
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
                            <h1 key={value} className="col-lg-3">123</h1>
                        ))
                    }
                </div>
            ) : ""

        }
        <Button variant="outlined" color="secondary" onClick={(() => submit())} className={classes.button}>
            Submit
        </Button>
    </>;
}