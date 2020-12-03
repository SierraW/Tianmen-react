import React from "react";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TiemlineTimeSlotWidget from "./TimelineTimeSlotWidget";
import Button from '@material-ui/core/Button';

TimelineWeekdayForm.propTypes = {
    weekdays: PropTypes.array.isRequired,
    timeslots: PropTypes.array.isRequired,
    specialTimeslots: PropTypes.object.isRequired,
    setSpecialTimeslot: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
}

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        marginTop: theme.spacing(1),
    },
}));

export default function TimelineWeekdayForm({ weekdays, timeslots, specialTimeslots, setSpecialTimeslot, onHide }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function getInitTimeslots(weekday) {
        if (specialTimeslots[weekday]) {
            return specialTimeslots[weekday];
        }
        return timeslots;
    }

    function handleChange(weekday, newTimeslots) {
        setSpecialTimeslot(weekday, newTimeslots);
    }

    function handleDelete(weekday) {
        setSpecialTimeslot(weekday, null);
        onHide();
    }

    function checkTimeslots() {
        if (timeslots.length === 0) {
            return true;
        }
        for (var i = 0; i < timeslots.length; i++) {
            if (timeslots[i].from === "") {
                continue;
            }
            return false;
        }
        return true;
    }

    return <>
        {
            weekdays.length === 0 ? (
                <Typography>You dont have any weekday set up.</Typography>
            ) : ""
        }
        {
            checkTimeslots() ? (
                <Typography>You dont have any timeslot set up.</Typography>
            ) : ""
        }
        {
            weekdays.length > 0 && !checkTimeslots() ? (
                <>
                    {
                        weekdays.map((weekday, index) => (
                            <ExpansionPanel key={index} expanded={expanded === index} onChange={handleExpand(index)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                >
                                    <Typography className={classes.heading}>{weekday}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div>
                                        <TiemlineTimeSlotWidget initTimeslots={getInitTimeslots(weekday)} setTimeline={(newValue) => handleChange(weekday, newValue)} />
                                        <div className={classes.button} >
                                            <Button className="text-danger" onClick={() => handleDelete(weekday)} style={{ width: "40%" }}>Discard Changes</Button>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))
                    }
                </>
            ) : ""
        }
    </>;
}