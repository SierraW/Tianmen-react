import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    drawerPaper: { background: "lightgrey" },
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }));

export default function TimelineTimeline({ weekday, timelines }) {
    const classes = useStyles();

    return <Paper elevation={3} className={classes.drawerPaper}>
        <Typography variant="h6">{weekday.title}</Typography>
        {
            timelines.map((timeline, index) => (
                <Paper elevation={5} key={index} className="my-3 p-3">
                    <Typography>{ timeline.from === "" ? "Awaiting Input" : `From ${timeline.from} To ${timeline.to}`}</Typography>
                </Paper>
            ))
        }
    </Paper>;
}