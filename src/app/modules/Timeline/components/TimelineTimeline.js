import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import TimelineTimeSlotPaper from "./TimelineTimeSlotPaper";

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
        setCombinedTimeline(result);
    }, [weekdays, timelines, specialTimelines])

    return <div className="d-flex">
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