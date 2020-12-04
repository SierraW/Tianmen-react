import React, { useEffect, useState } from "react";
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import { useSubheader } from "../../../../_metronic/layout";
import { em_tl, em_timeline, em_appointment } from "../../../../services/firebaseInit";
import { formatDate } from "../../../../services/datePrintingService";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { useSelector } from "react-redux";
import TimelineReservationSuccess from "../components/TRSuccess";

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
const all_manager_option = { user_login: false, display_name: "All Managers" };

export function TimelineReservationPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Reservation");
    const [apSuccess, setApSuccess] = useState(false);
    const [phone, setPhone] = useState("");
    const [appointmentMade, setAppointmentMade] = useState({});
    const [managers, setManager] = useState([]);
    const [transTime, setTransTime] = useState(false);
    const [timelines, setTimeline] = useState({});
    const [preferManager, setPM] = useState(all_manager_option);
    const [preferMethod, setPreferMethod] = useState("Phone");
    const [avaliableDates, setAvaliableDate] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(-1);
    const [selectedItems, setSelectedItem] = useState([]);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(-1);
    const dateArr = generateDatesFromNow();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        axios.post("http://tianmengroup.com/server/socket/home/getManager.php", { session: user.user_session })
            .then(({ data }) => {
                if (data.success === "success") {
                    setManager([all_manager_option, ...data.data]);
                }
            })
    }, []);

    useEffect(() => {
        handleSelectDay(avaliableDates.findIndex(value => value === 1));
    }, [timelines])

    useEffect(() => {
        function handleOutput(result) {
            var output = {};
            var avDate = [];
            for (var i = 0; i < numberOfDaysAhead; i++) {
                avDate.push(0);
            }
            result.forEach((timelineObj) => {
                const result = generateTimelineWithDates(timelineObj, avDate);
                output[timelineObj.uid] = result[0];
                avDate = result[1];
            })
            setAvaliableDate(avDate);
            return output;
        }

        if (preferManager.user_login === false) {
            var unsubscribe = em_tl.onSnapshot((querySnapshot) => {
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
                setTimeline(handleOutput(result));
            })
        } else {
            var unsubscribe = em_timeline(preferManager.user_login).onSnapshot((doc) => {
                setAvaliableDate([]);
                var result = [];
                if (doc.exists) {
                    result.push({
                        uid: doc.id,
                        weekdays: doc.data().weekdays,
                        timelines: doc.data().timelines,
                        specialTimelines: doc.data().specialTimelines,
                        excludes: doc.data().excludes
                    })
                }
                setTimeline(handleOutput(result));
            })
        }

        return function cleanup() {
            unsubscribe();
        };
    }, [appointmentMade])

    useEffect(() => {
        var unsubscribe = em_appointment(preferManager.user_login === false ? null : preferManager.user_login)
            .onSnapshot((querySnapshot) => {
                var result = {};
                querySnapshot.forEach((doc) => {
                    if (!result[doc.data().advisor_login]) {
                        result[doc.data().advisor_login] = {};
                    }
                    if (!result[doc.data().advisor_login][doc.data().date]) {
                        result[doc.data().advisor_login][doc.data().date] = {};
                    }
                    result[doc.data().advisor_login][doc.data().date][doc.data().timeline.from] = doc.data().timeline.to;
                })
                setAppointmentMade(result);
            })

        return function cleanup() {
            unsubscribe();
        };
    }, [preferManager]);

    useEffect(() => {
        setSelectedTimeIndex(-1);
        if (selectedItems.length > 0) {
            setTransTime(true);
        }
    }, [selectedItems]);

    function findManager(login) {
        return managers.find(mam => mam.user_login === login);
    }

    function handleSelectDay(index) {
        setTransTime(false);
        setSelectedDateIndex(index);
        if (selectedItems.length > 0) {
            setTimeout(() => {
                setSelectedItem(getAllMatchedTimeline(index));
            }, 200)
        } else {
            setSelectedItem(getAllMatchedTimeline(index));
        }
    }

    function getAllMatchedTimeline(index) {
        var resultTimeline = [];
        let keys = [];
        for (let key in timelines) {
            if (timelines.hasOwnProperty(key)) keys.push(key);
        }
        for (var i = 0; i < keys.length; i++) {
            timelines[keys[i]][index].forEach(timeline => {
                resultTimeline.push({
                    login: keys[i],
                    date: dateArr[index],
                    timeline
                });
            })
        }
        resultTimeline.sort((a, b) => a.timeline.from.localeCompare(b.timeline.from));
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

    function generateTimelineWithDates(timelineObj, avDate) {
        const days = generateDatesFromNow();
        var result = [];
        var excludesMap = {};
        timelineObj.excludes.forEach(exclude => {
            excludesMap[exclude.date] = exclude.timelines;
        })
        for (var i = 0; i < days.length; i++) {
            const date = days[i];
            const day = new Date(date);
            day.setTime(day.getTime() + day.getTimezoneOffset() * 60 * 1000);
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
                var fullyBooked = true;
                for (var j = 0; j < result[i].length; j++) {
                    if (!checkConflict(timelineObj.uid, date, result[i][j].from)) {
                        fullyBooked = false;
                        break;
                    }
                }
                avDate[i] = fullyBooked ? 0 : 1;
            }
        }
        return [result, avDate];
    }

    function checkConflict(login, date, from) {
        if (appointmentMade[login]) {
            if (appointmentMade[login][date]) {
                if (appointmentMade[login][date][from]) {
                    return true
                }
            }
        }
        return false;
    }

    function commit() {
        if (selectedTimeIndex === -1) {
            return;
        }
        if (checkConflict(selectedItems[selectedTimeIndex].login, dateArr[selectedDateIndex], selectedItems[selectedTimeIndex].timeline.from)) {
            return;
        }
        const appointmentObj = {
            advisor_email: findManager(selectedItems[selectedTimeIndex].login).user_email,
            advisor_display_name: findManager(selectedItems[selectedTimeIndex].login).display_name,
            advisor_login: selectedItems[selectedTimeIndex].login,
            user_email: user.user_email,
            user_login: user.user_login,
            date: dateArr[selectedDateIndex],
            contactMethod: preferMethod,
            contact: preferMethod === "Phone" ? phone : user.user_email,
            timeline: selectedItems[selectedTimeIndex].timeline
        }
        em_appointment().add(appointmentObj).then(() => {
            setApSuccess(appointmentObj);
        });
    }

    if (apSuccess) {
        return <TimelineReservationSuccess method={apSuccess.contactMethod} contactInfo={ apSuccess.contact } managerEmail={apSuccess.advisor_email} managerDN={apSuccess.advisor_display_name} userEmail={apSuccess.user_email} date={apSuccess.date} timeline={apSuccess.timeline} />
    } else {
        return <>
            <div className="card card-body">
                <h3 className="text-center">With whom and when would you like to meet?</h3>
                <div className="mt-6 d-flex align-items-center justify-content-between">
                    {
                        dateArr.map((date, index) => (
                            <Button key={index} disabled={avaliableDates[index] === 0} className={`p-6 ${selectedDateIndex === index ? "border-6 border-primary" : ""}`} variant="outlined" onClick={() => handleSelectDay(index)}><h3 className={`${avaliableDates[index] === 0 ? "text-muted" : ""}`} style={{ margin: 0, padding: 0 }}>{date}</h3></Button>
                        ))
                    }
                </div>
                <div className="mt-6 d-flex align-items-end justify-content-between">
                    <h3>December 2020</h3>
                    <div className="d-flex align-items-end justify-content-between">
                        <div className="d-flex align-items-baseline flex-column mr-6">
                            <p>Manager</p>
                            <Autocomplete
                                id="combo-box-advisor"
                                options={managers}
                                value={preferManager}
                                onChange={(event, newValue) => {
                                    setPM(newValue);
                                }}
                                getOptionLabel={(option) => option.display_name}
                                style={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                        <div className="d-flex align-items-baseline flex-column">
                            <p>Method</p>
                            <Autocomplete
                                id="combo-box-method"
                                value={preferMethod}
                                onChange={(event, newValue) => {
                                    setPreferMethod(newValue);
                                }}
                                options={["Phone", "Email"]}
                                getOptionLabel={(option) => option}
                                style={{ width: 200 }}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </div>
                    </div>
                </div>
                <Divider className="my-6" />
                {
                    selectedItems.length > 0 ? (
                        <>
                            <h3>Avaliable Times On {selectedItems[0].date}</h3>
                            <div className="my-6 d-flex align-items-center">
                                {
                                    selectedItems.map((item, index) => (
                                        <Zoom key={index} in={transTime} style={{ transitionDelay: transTime ? `${index * 100}ms` : '0ms' }}>
                                            <Button className={`p-3 mx-3 ${selectedTimeIndex === index ? "bg-primary text-white" : ""} ${checkConflict(item.login, dateArr[selectedDateIndex], item.timeline.from) ? "text-muted" : ""}`} disabled={checkConflict(item.login, dateArr[selectedDateIndex], item.timeline.from)} variant="outlined" onClick={() => setSelectedTimeIndex(index)}><p style={{ margin: 0, padding: 0 }}>FROM {item.timeline.from} To {item.timeline.to}</p></Button>
                                        </Zoom>
                                    ))
                                }
                            </div>
                        </>
                    ) : ""
                }
                {

                }
                <div className={`d-flex mt-6 flex-row-reverse ${preferMethod === "Phone" ? "justify-content-between" : ""}`}>
                    <Button variant="outlined" size="large" color="secondary" onClick={() => commit()}>Pick Me!</Button>
                    {preferMethod === "Phone" ? (
                        <TextField label="Your Phone Number" style={{ width: "30rem" }} required variant="outlined" type="number" value={phone} onChange={(e) => setPhone(e.target.value)}></TextField>
                    ) : ""}
                </div>
            </div>
        </>;
    }
}