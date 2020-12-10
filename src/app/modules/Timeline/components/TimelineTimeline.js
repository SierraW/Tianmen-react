import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import TimelineTimeSlotPaper from "./TimelineTimeSlotPaper";
import '../styles/main.css';

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        background: "#0275d8",
        color: "white",
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    warningDrawerPaper: {
        background: "#f0ad4e",
        color: "white",
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export default function TimelineTimeline({ weekdays, timelines, specialTimelines }) {
    const classes = useStyles();

    const [combinedTimelines, setCombinedTimeline] = useState([]);

    useEffect(() => {
        var result = [];
        weekdays.forEach((weekday) => {
            if (specialTimelines[weekday]) {
                result.push({ title: weekday, timelines: specialTimelines[weekday], specialized: true });
            } else {
                result.push({ title: weekday, timelines });
            }
        })
        const day = new Date();
        day.setTime(day.getTime() + day.getTimezoneOffset() * 60 * 1000);
        const weekdayNow = day.getDay();
        for (var i = 0; i < result.length; i++) {
            const title = result[i].title;
            if (daysInWeek.findIndex(value => value === title) >= weekdayNow) {
                if (i === 0) {
                    break;
                }
                var elementNeedsToMove = result.splice(i, result.length - i);
                result = elementNeedsToMove.concat(result);
            }
        }
        setCombinedTimeline(result);
    }, [weekdays, timelines, specialTimelines])

    return <div className="d-flex hideScrollBar" style={{overflowX: "scroll"}}>
        {
            combinedTimelines.map((weekday, index) => (
                <div key={index} className="p-6">
                    <Paper elevation={3} className={weekday.specialized ? classes.warningDrawerPaper : classes.drawerPaper}>
                        <Typography variant="h6">{weekday.title}</Typography>
                        <Typography variant="body1" >{weekday.specialized ? "SPECIALIZED" : "General"}</Typography>
                        {
                            weekday.timelines.map((timeline, index) => (
                                <TimelineTimeSlotPaper key={index} >
                                    {`From ${timeline.from} To ${timeline.to}`}
                                </TimelineTimeSlotPaper>
                            ))
                        }
                    </Paper>
                </div>
            ))
        }
    </div>
}