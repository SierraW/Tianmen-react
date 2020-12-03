import React, { useEffect, useState } from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useSubheader } from "../../../../_metronic/layout";
import { em_tl, em_timeline } from "../../../../services/firebaseInit";
import { formatDate } from "../../../../services/datePrintingService";

const daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const numberOfDaysAhead = 7;

export function TimelineReservationPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Reservation");
    const [loading, setLoading] = useState(true);
    const [timelines, setTimeline] = useState({});
    const [preferUserLogin, setPUL] = useState(false);
    const [avaliableDates, setAvaliableDate] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dateArr = generateDatesFromNow();

    useEffect(() => {
        if (preferUserLogin === false) {
            var unsubscribe = em_tl.onSnapshot((querySnapshot) => {
                refreshAvDate();
                var result = [];
                querySnapshot.forEach((doc) => {
                    result.push({
                        uid: doc.id,
                        weekdays: doc.data().weekdays,
                        timelines: doc.data().timelines,
                        specialTimelines: doc.data().specialTimelines,
                        excludes: doc.data().excludes
                    })
                })
                var output = {};
                result.forEach((timelineObj) => {
                    output[timelineObj.uid] = generateTimelineWithDates(timelineObj);
                })
                setTimeline(output);
            })
        } else {
            var unsubscribe = em_timeline(preferUserLogin).onSnapshot((doc) => {
                refreshAvDate();
                setAvaliableDate([]);
                var result = [];
                result.push({
                    uid: doc.id,
                    weekdays: doc.data().weekdays,
                    timelines: doc.data().timelines,
                    specialTimelines: doc.data().specialTimelines,
                    excludes: doc.data().excludes
                })
                var output = {};
                result.forEach((timelineObj) => {
                    output[timelineObj.uid] = generateTimelineWithDates(timelineObj);
                })
                setTimeline(output);
            })
        }

        return function cleanup() {
            unsubscribe();
        };
    }, [preferUserLogin]);


    function handleSelect(index) {
        setSelectedIndex(index);
        console.log(getAllMatchedTimeline(index));
    }

    function refreshAvDate() {
        var result = [];
        for (var i = 0; i < numberOfDaysAhead; i++) {
            result.push(0);
        }
        setAvaliableDate(result);
    }

    function modifyAvaliableDate(pos) {
        if (avaliableDates[pos] === 1) {
            return;
        }
        var myAVD = avaliableDates;
        myAVD[pos] = 1;
        setAvaliableDate(myAVD);
    }

    function getAllMatchedTimeline(index) {
        var resultTimeline = [];
        let keys = [];
        for (let key in timelines) {
            if (timelines.hasOwnProperty(key)) keys.push(key);
        }
        for (var i = 0; i < keys.length; i++) {
            resultTimeline.push(timelines[keys[i]][index]);
        }
        return resultTimeline;
    }

    function generateDatesFromNow() {
        var days = [];
        const now = new Date();
        now.setDate(now.getDate() + 1); // tomorrow!
        for (var i = 0; i < numberOfDaysAhead; i++) {
            days.push(formatDate(now));
            now.setDate(now.getDate() + 1); // tomorrow!
        }
        return days;
    }

    function generateTimelineWithDates(timelineObj) {
        const days = generateDatesFromNow();
        var result = [];
        var excludesMap = {};
        timelineObj.excludes.forEach(exclude => {
            excludesMap[exclude.date] = exclude.timelines;
        })
        for (var i = 0; i < days.length; i++) {
            const date = days[i];
            const day = new Date(date);
            day.setTime( day.getTime() + day.getTimezoneOffset()*60*1000 );
            const weekday = daysInWeek[day.getDay()];
            if (excludesMap[date]) {
                result.push(excludesMap[date]);
            } else if (timelineObj.weekdays.includes(weekday)) {
                if (timelineObj.specialTimelines[weekday]) { // TODO existed appointment check
                    result.push(timelineObj.specialTimelines[weekday]);
                } else {
                    result.push(timelineObj.timelines);
                }
            } else {
                result.push([]);
            }
            if (result[i].length > 0) {
                modifyAvaliableDate(i);
            }
        }
        return result;
    }

    function commit() {
        console.log("timeline", timelines);
        console.log("avd", avaliableDates);
    }

    return <>
        <div className="card card-body">
            <h3 className="text-center">With whom and when would you like to meet?</h3>
            <div className="d-flex">
                {
                    dateArr.map((date, index) => (
                        avaliableDates[index] === 1 ? (
                            <Button key={index} variant="outlined" onClick={() => handleSelect(index)}>{date}</Button>
                        ) : (
                            <Button key={index} variant="outlined" disabled >{date}</Button>
                        )
                    ))
                }
            </div>
            <div className="d-flex">
                <Button onClick={() => commit()}>Pick Me!</Button>
            </div>
        </div>
    </>;
}