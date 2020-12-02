import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    drawerPaper: { background: "lightgrey" },
    margin: theme.spacing(1),
    padding: theme.spacing(1)
}));

export default function TimelineTimeline({ weekdays, timelines, specialTimelines }) {
    const classes = useStyles();

    const [combinedTimelines, setCombinedTimeline] = useState([]);

    useEffect(() => {
        var result = [];
        weekdays.forEach((weekday) => {
            if (specialTimelines[weekday.title]) {
                result.push({title: weekday.title , timelines: specialTimelines[weekday.title]});
            } else {
                result.push({title: weekday.title , timelines});
            }
        })
        setCombinedTimeline(result);
    }, [weekdays, timelines, specialTimelines])

    return <div className="d-flex">
        {
            combinedTimelines.map((weekday, index) => (
                <div key={index} className="p-6">
                    <Paper elevation={3} className={classes.drawerPaper}>
                        <Typography variant="h6">{weekday.title}</Typography>
                        {
                            weekday.timelines.map((timeline, index) => (
                                <Paper elevation={5} key={index} className="my-3 p-3">
                                    <Typography>{timeline.from === "" ? "Awaiting Input" : `From ${timeline.from} To ${timeline.to}`}</Typography>
                                </Paper>
                            ))
                        }
                    </Paper>
                </div>
            ))
        }
    </div>
}