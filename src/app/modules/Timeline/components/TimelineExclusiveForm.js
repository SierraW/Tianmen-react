import React, { useState, useEffect } from "react";
import Zoom from '@material-ui/core/Zoom';
import { Alert, AlertTitle } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from "../../../../services/datePrintingService";
import CustomVCModal from "../../Modal/CustomVCModal";
import TimelineExclusiveDetailForm from "./TimelineExclusiveDetailForm";
import TimelineTimeSlotPaper from "./TimelineTimeSlotPaper";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(1),
    },
    alert: {
        margin: `${theme.spacing(1)} 0`,
    },
    inputButton: {
        height: "80%",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: 0
    },
    inputField: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: 0
    },
    drawerPaper: {
        background: "#0275d8"
    },
}));

export default function TimelineExclusiveForm({ commitExclude, initExclude }) {
    const classes = useStyles();
    const [excludes, setExclude] = useState([]);
    const [ucWarning, setUcWarning] = useState(false);
    const [timelineConflictWarning, setTlcWarning] = useState(false);
    const [dateInvalidWarning, setDiWarning] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [focus, setFocus] = useState(-1);
    const now = formatDate(new Date());

    useEffect(() => {
        var fixedExclude = [...initExclude];
        for (var i = 0; i < initExclude.length; i++) {
            if (initExclude[i].date <= now) {
                fixedExclude.splice(0, 1);
            }
        }
        setExclude(fixedExclude);
    }, [initExclude]);

    useEffect(() => {
        var dateMap = {};
        var diw = false;
        var ucw = false;
        var tlcw = false;
        for (var i = 0; i < excludes.length; i++) {
            if (excludes[i].date === "") {
                ucw = true;
            } else if (excludes[i].date <= now) {
                diw = true;
            }
            if (dateMap[excludes[i].date]) {
                tlcw = true;
            } else {
                if (excludes[i].date !== "") {
                    dateMap[excludes[i].date] = true;
                }
            }
        }
        setDiWarning(diw);
        setUcWarning(ucw);
        setTlcWarning(tlcw);
        if (!ucw && !tlcw && !diw) {
            commitExclude(excludes);
        }
    }, [excludes]);

    function handleEditDetail(pos) {
        if (!excludes[pos].date || excludes[pos].date === "") {
            alert("Date uncomplete. Your date must fill before edit details.");
            return;
        } else if (excludes[pos].date <= now) {
            alert("Date invalid. Your date must be greater than today.");
            return;
        }
        setFocus(pos);
        setShowDetail(true);
    }

    function handleDelete(pos) {
        var newExcludes = [...excludes];
        newExcludes.splice(pos, 1);
        setExclude(newExcludes);
    }

    function addExclude() {
        setExclude([...excludes, { date: "", timelines: [] }]);
    }

    function modifyExclude(pos, value) {
        var newExcludes = [...excludes];
        newExcludes[pos] = { ...newExcludes[pos], ...value };
        newExcludes.sort((a, b) => a.date.localeCompare(b.date));
        setExclude(newExcludes);
    }

    return <>
        <CustomVCModal body={() => (<TimelineExclusiveDetailForm data={excludes[focus]} setData={(newValue) => modifyExclude(focus, newValue)} />)} show={showDetail} onHide={() => setShowDetail(false)} />
        {
            timelineConflictWarning ? (
                <Zoom in={timelineConflictWarning}>
                    <Alert className="my-3" severity="error">
                        <AlertTitle>Date Conflict</AlertTitle>
                    Your dates have one or more conflict(s), they will not be save until fix.
                    </Alert>
                </Zoom>
            ) : ""
        }
        {
            ucWarning ? (
                <Zoom in={ucWarning}>
                    <Alert className="my-3" severity="warning">
                        <AlertTitle>Date Uncomplete</AlertTitle>
                    Your dates have one or more record(s) empty, they will not be save until fix.
                    </Alert>
                </Zoom>
            ) : ""
        }
        {
            dateInvalidWarning ? (
                <Zoom in={dateInvalidWarning}>
                    <Alert className="my-3" severity="info">
                        <AlertTitle>Date Invalid</AlertTitle>
                    Excluded date range starts from tomorrow, you must have one or more dates invalid, they will not be save until fix.
                    </Alert>
                </Zoom>
            ) : ""
        }
        <Button variant="outlined" color="secondary" onClick={(() => addExclude())} className={classes.button}>
            + Exclude Date
        </Button>
        {
            excludes.length > 0 ? (
                <div className="row">
                    {
                        excludes.map((exclude, index) => (
                            <div key={index} className="col-lg-4 px-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <TextField
                                        className={classes.inputField}
                                        type="date"
                                        value={exclude.date}
                                        onChange={(e) => modifyExclude(index, { date: e.target.value })}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <Button className={classes.inputButton} onClick={() => handleEditDetail(index)} ><EditIcon className="text-primary" /></Button>
                                    <Button className={classes.inputButton} onClick={() => handleDelete(index)} ><DeleteIcon className="text-danger" /></Button>
                                </div>
                                {
                                    exclude.timelines.length > 0 ? (
                                        <>
                                            {
                                                exclude.timelines.map((timeline, index) => (
                                                    <TimelineTimeSlotPaper key={index} >
                                                        From {timeline.from} To {timeline.to}
                                                    </TimelineTimeSlotPaper>
                                                ))
                                            }
                                        </>
                                    ) : (
                                            <TimelineTimeSlotPaper>
                                                <ErrorOutlineIcon className="text-danger" />&nbsp;No Reservation Allowed
                                            </TimelineTimeSlotPaper>
                                        )
                                }
                            </div>
                        ))
                    }
                </div>
            ) : ""

        }
    </>;
}