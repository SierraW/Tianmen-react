import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TiemlineTimeSlotWidget from "./TimelineTimeSlotWidget";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function TimelineWeekdaySec({name, timeslots}) {
  const classes = useStyles();

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
                <TiemlineTimeSlotWidget initTimeslots={timeslots} identifier={name.title} />
            </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </>
  );
}