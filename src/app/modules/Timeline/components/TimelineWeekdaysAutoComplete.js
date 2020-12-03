import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

export default function TimelineWeekdaysAutoComplete({ weekdays, setWeekday }) {
    const [day, setDay] = useState(weekdays);

    function insertionSort(inputArr) {
        let n = inputArr.length;
            for (let i = 1; i < n; i++) {
                // Choosing the first element in our unsorted subarray
                let current = inputArr[i];
                // The last element of our sorted subarray
                let j = i-1; 
                while ((j > -1) && (daysInWeek.findIndex(day => day === current) < daysInWeek.findIndex(day => day === inputArr[j]))) {
                    inputArr[j+1] = inputArr[j];
                    j--;
                }
                inputArr[j+1] = current;
            }
        return inputArr;
    }

    function handleChange(newVal) {
        var myDay = insertionSort([...newVal]);
        setDay(myDay);
        setWeekday(myDay);
    }

    return (
        <Autocomplete
            value={day}
            onChange={(e, newVal) => handleChange(newVal)}
            multiple
            id="tl-wd-ac"
            options={daysInWeek}
            getOptionLabel={(option) => option}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Weekdays" variant="outlined" />}
        />
    );
}