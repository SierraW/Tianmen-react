import React from "react";
import Typography from '@material-ui/core/Typography';
import TimelineTimeSlotWidget from "./TimelineTimeSlotWidget";
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";

TimelineExclusiveDetailForm.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func.isRequired
}

export default function TimelineExclusiveDetailForm({ data, setData }) {

    const [open, setOpen] = React.useState(true);

    function handleChanges(newTimeline) {
        setData({ timelines: newTimeline });
    }

    return <>
        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                How It Works: Timelines on this date ({data.date}) will override all its general timelines.
                <br />
                A blank record means you are not going to take any reservation on this date.
            </Alert>
        </Collapse>
        <Typography variant="h6">{data.date}</Typography>
        <TimelineTimeSlotWidget initTimeslots={data.timelines} setTimeline={handleChanges} />
    </>;
}