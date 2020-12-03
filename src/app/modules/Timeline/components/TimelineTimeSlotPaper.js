import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

export default function TimelineTimeSlotPaper({children}) {
    return <Paper elevation={3} className="my-3 p-3 text-center">
        <Typography>{children}</Typography>
    </Paper>
}