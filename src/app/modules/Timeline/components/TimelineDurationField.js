import React from "react";
import TextField from '@material-ui/core/TextField';

export default function TimelineDurationField({ duration, setDuration }) {

    const [tempDur, setTempDur] = React.useState(duration);

    React.useEffect(() => {
        setTempDur(duration);
    }, [duration]);

    function handleChange(value) {
        if (value === "") {
            setTempDur(60);
            setDuration(60);
        }
        const num = parseInt(value);
        if (num >= 30 && num <= 120) {
            setDuration(num);
        } else if (num < 30) {
            setDuration(30);
        } else if (num > 120) {
            setDuration(120);
        }
    }

    return <TextField
        style={{width: "100%"}}
        label="Duration for each meeting time (min)"
        type="number"
        value={tempDur}
        onChange={(e) => setTempDur(e.target.value)}
        onBlur={(e) => handleChange(e.target.value)}
        margin="normal"
        variant="outlined"
    />;
}