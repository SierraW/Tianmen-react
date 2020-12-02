import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        height: "80%",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: 0
    },
    inputField: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: 0
    }
  }));

export default function TimelineDateField({className}) {
    const [date, setDate] = React.useState("");
    const classes = useStyles();

    // React.useEffect(() => {
    //     setDate(date);
    // }, [duration]);

    function handleChange(value) {
        setDate(value);
    }

    return <div className={`${className} d-flex align-items-center justify-content-between`}>
    <TextField
        className={classes.inputField}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onBlur={(e) => handleChange(e.target.value)}
        margin="normal"
        variant="outlined"
    />
    <Button className={classes.button} onClick={() => alert("123")} variant="outlined"><EditIcon className="text-primary" /></Button>
    <Button className={classes.button} onClick={() => alert("123")} variant="outlined"><DeleteIcon className="text-danger" /></Button>
    </div>;
}