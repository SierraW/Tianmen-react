import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const weekdays = [
    { title: "Monday", value: 1 },
    { title: "Tuesday", value: 2 },
    { title: "Wednesday", value: 3 },
    { title: "Thursday", value: 4 },
    { title: "Friday", value: 5 },
    { title: "Saturday", value: 6 },
    { title: "Sunday", value: 0 }
]

export default function TimelineWeekdaysAutoComplete() {
    const [day, setDay] = useState([]);

    function insertionSort(inputArr) {
        let n = inputArr.length;
            for (let i = 1; i < n; i++) {
                // Choosing the first element in our unsorted subarray
                let current = inputArr[i];
                // The last element of our sorted subarray
                let j = i-1; 
                while ((j > -1) && (current.value < inputArr[j].value)) {
                    inputArr[j+1] = inputArr[j];
                    j--;
                }
                inputArr[j+1] = current;
            }
        return inputArr;
    }

    function handleChange(newVal) {
        var myDay = [...newVal];
        setDay(insertionSort(myDay));
    }

    return (
        <Autocomplete
            value={day}
            onChange={(e, newVal) => handleChange(newVal)}
            multiple
            id="tl-wd-ac"
            options={weekdays}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Weekdays" variant="outlined" />}
        />
    );
}