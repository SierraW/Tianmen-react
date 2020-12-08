import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TiemlineTimeSlotWidget from "./TimelineTimeSlotWidget";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

TimelineWeekdaySec.propTypes = {
    name: PropTypes.object.isRequired,
    timeslots: PropTypes.array.isRequired,
    specialTimeslots: PropTypes.object.isRequired,
    setSpecialTimeslot: PropTypes.func.isRequired
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

export default function TimelineWeekdaySec({ name, timeslots, specialTimeslots, setSpecialTimeslot }) {
    const classes = useStyles();

    function getInitTimeslots() {
        if (specialTimeslots[name.title]) {
            return specialTimeslots[name.title];
        }
        return timeslots;
    }

    function handleChange(newTimeslots) {
        setSpecialTimeslot(0, name.title, newTimeslots);
    }
    
    function handleDelete() {
        setSpecialTimeslot(0, name.title, null);
    }

    return (
        <>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography className={classes.heading}>{name.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        <TiemlineTimeSlotWidget initTimeslots={getInitTimeslots()} setTimeline={handleChange} />
                        <div className={classes.button} >
                            <Button className="text-danger" onClick={() => handleDelete()} style={{width: "40%"}}>Remove Changes</Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    );
}