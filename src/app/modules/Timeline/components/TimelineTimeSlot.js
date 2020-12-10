import React, { useState, useEffect, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
        marginBottom: 0,
    },
    inputField: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: 0
    }
  }));

export default function TimelineTimeSlot({initFrom, initTo, commitValue, handleDelete}) {
    const [from, setFrom] = useState(initFrom);
    const [to, setTo] = useState(initTo);
    const [diff, setDiff] = useState("");
    const cbCompare = useCallback((lhs, rhs) => {
        if (lhs === "" || rhs === "") {
            setDiff("0 hours and 0 minutes");
            return false;
        }
        const lhsMin = lhs.slice(0,2), lhsSec = lhs.slice(-2);
        const rhsMin = rhs.slice(0,2), rhsSec = rhs.slice(-2);
        
        if (lhsMin > rhsMin || (lhsMin === rhsMin && lhsSec > rhsSec)) {
            calDiff(lhsMin, lhsSec, rhsMin, rhsSec);
            return true;
        }
        calDiff(rhsMin, rhsSec, lhsMin, lhsSec);
        return false;
    }, [])

    useEffect(() => {
        setFrom(initFrom);
        setTo(initTo);
        cbCompare(initFrom, initTo);
    }, [initFrom, initTo, cbCompare]);

    

    const classes = useStyles();

    function superFixMachine(timeToBeFix) {
        var time = timeToBeFix.replace(/[^0-9:]/g,'');
        time = time.split(":");
        if (time.length < 2) {
            return time[0];
        }
        return `${time[0]}:${time[1]}`;
    }

    function handleChange(type, newValue, mandatory=false) {
        if (newValue.length > 5) {
            return;
        }
        const oldValue = type === 0 ? from : to
        if (!mandatory && oldValue.length >= newValue.length) { // delete
            setValue(type, superFixMachine(newValue));
        } else {
            if (newValue.split(":").length === 1) {
                if (/^[0-2]$/.test(newValue)) {
                    setValue(type, newValue);
                    return;
                }
                if (/^[3-9]$/.test(newValue)) {
                    setValue(type, `0${newValue}:`);
                    return;
                }
                if (/^[0-9][:：]$/.test(newValue)) {
                    setValue(type, `0${newValue.slice(0,-1)}:`);
                    return;
                }
                if (/^2[4-9]|[3-9][0-9]$/.test(newValue)) {
                    handleChange(type, `0${newValue.slice(0,-1)}:${newValue.slice(-1)}`);
                    return;
                }
                if (/^[01][0-9]|2[0-3]$/.test(newValue)) {
                    setValue(type, `${newValue}:`);
                    return;
                }
                if (/^([01][0-9]|2[0-3])[0-9]$/.test(newValue)) {
                    handleChange(type, `${newValue.slice(0,-1)}:${newValue.slice(-1)}`);
                    return;
                }
            } else {
                const newValueArr = newValue.split(":");
                if (newValueArr.length !== 2) {
                    return;
                } else {
                    const hour = newValueArr[0];

                    if (!/^[01][0-9]|2[0-3]$/.test(hour)) {
                        if (/^[0-2]$/.test(hour)) {
                            setValue(type, newValue);
                            return;
                        }
                        if (/^[3-9]$/.test(hour)) {
                            setValue(type, `0${newValue}`);
                            return;
                        }
                    } else {
                        if (/^(0[0-9]|1[0-9]|2[0-3]):([6-9])$/.test(newValue)) {
                            setValue(type, `${newValue.slice(0, -1)}0${newValue.slice(-1)}`);
                            return;
                        }
                        if (/^([01][0-9]|2[0-3]):[0-5][0-9]?$/.test(newValue)) {
                            setValue(type, newValue);
                            return;
                        }
                    }
                }
            }
        }
    }

    function completeFixMachine(time) {
        var slice = time.split(":");
        var hour = parseInt(slice[0]);
        var min = parseInt(slice[1]);
        if (isNaN(hour)) {
            hour = "13";
        } else if (hour > 23) {
            hour = 23;
        } else if ( hour < 0 ) {
            hour = "00";
        } else if (hour < 10) {
            hour = `0${hour}`;
        }
        if (isNaN(min)) {
            min = "00";
        } else if (min > 59) {
            min = 59;
        } else if (min < 0) {
            min = "00";
        } else if (min < 10) {
            min = `0${min}`;
        }
        return `${hour}:${min}`;
    }

    function setValue(type, value, foucusOut=false) {
        if (type === 0) {
            if (foucusOut && to.length === 5 && value.length === 5) {
                if (cbCompare(value, to)) {
                    commitValue({from: to, to: value});
                    setFrom(to);
                    setTo(value);
                    return;
                }
                commitValue({from: value, to});
            }
            setFrom(value);
        } else {
            if (foucusOut && from.length === 5 && value.length === 5) {
                if (cbCompare(from, value)) {
                    commitValue({from: value, to: from});
                    setTo(from);
                    setFrom(value);
                    return;
                }
                commitValue({from, to: value});
            } 
            setTo(value);
        }
    }

    function handleValue(type, value) {
        if (value === "") {
            return;
        }
        if (/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            setValue(type, value, true);
        } else {
            setValue(type, completeFixMachine(value), true);
        }
    }

    function calDiff(lhsMin, lhsSec, rhsMin, rhsSec) {
        const numLhsMin = parseInt(lhsMin);
        const numLhsSec = parseInt(lhsSec);
        const numRhsMin = parseInt(rhsMin);
        const numRhsSec = parseInt(rhsSec);
        if (numLhsSec >= numRhsSec) {
            setDiff(`${numLhsMin - numRhsMin} hours ${numLhsSec - numRhsSec} minutes`);
        } else {
            setDiff(`${numLhsMin - numRhsMin - 1} hours ${60 + numLhsSec - numRhsSec} minutes`);
        }
    }

    return <div className="d-flex align-items-center justify-content-between">
        <TextField
            className={classes.inputField}
            label="From"
            value={from}
            onChange={(e) => handleChange(0, e.target.value)}
            onBlur={(e) => handleValue(0, e.target.value)}
            margin="normal"
            variant="outlined"
        />

        <TextField
            className={classes.inputField}
            label="To"
            value={to}
            onChange={(e) => handleChange(1, e.target.value)}
            onBlur={(e) => handleValue(1, e.target.value)}
            margin="normal"
            variant="outlined"
        />

        <TextField
            className={classes.inputField}
            label="Duration"
            value={diff}
            disabled
            margin="normal"
            variant="outlined"
        />
        
        <Button className={classes.button} onClick={() => handleDelete()}><CloseIcon className="text-danger" /></Button>
        </div>;
}