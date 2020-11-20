import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { em_aida } from "../../../../services/firebaseInit";
import Button from '@material-ui/core/Button';
import CustomVCModal from "../../Modal/CustomVCModal";
import ProjectSubscriptionManagementAddOnAutoComplete from "./PSMAddOnAutoComplete";
import { formatDate } from "../../../../services/datePrintingService";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function ProjectSubscriptionManagementAddOnTable({ pid, setEstAmount }) {
    const classes = useStyles();

    const [addons, setAddOn] = useState([]);
    const [showInputModal, setShowInputModal] = useState(false);

    useEffect(() => {
        var unsubscribe = em_aida(pid).onSnapshot((querySnapshot) => {
            var addOnArr = [];
            var estAmount = 0;
            querySnapshot.forEach((doc) => {
                addOnArr.push({
                    aid: doc.id,
                    name: doc.data().name,
                    added: doc.data().added,
                    expired: doc.data().expired,
                    price: doc.data().price
                })
                if (!doc.data().expired) {
                    estAmount += doc.data().price;
                }
            })
            setAddOn(addOnArr);
            setEstAmount(estAmount);
        })
        return function cleanup() {
            unsubscribe();
        }
    }, [])

    function addNewAddOn() {
        setShowInputModal(true);
    }

    function inputContent() {
        return (
            <>
                <ProjectSubscriptionManagementAddOnAutoComplete pid={pid} onExit={() => setShowInputModal(false)} />
            </>
        )
    }

    function onDelete(addon) {
        em_aida(pid).doc(addon.aid).update({
            expired: formatDate(Date.now())
        })
    }

    return (
        <>
            <CustomVCModal body={inputContent} show={showInputModal} onHide={() => setShowInputModal(false)}></CustomVCModal>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Add-On</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Date Added</TableCell>
                            <TableCell align="right">Date Removed</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => addNewAddOn()} className={classes.button}>
                                    Add...
                            </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addons.map(addon => (
                            <TableRow key={addon.aid}>
                                <TableCell component="th" className={`${addon.expired ? "text-muted" : ""}`} scope="row">
                                    {addon.name}
                                </TableCell>
                                <TableCell className={`${addon.expired ? "text-muted" : ""}`} align="right">{addon.price}</TableCell>
                                <TableCell className={`${addon.expired ? "text-muted" : ""}`} align="right">{addon.added}</TableCell>
                                <TableCell className={`${addon.expired ? "text-muted" : ""}`} align="right">{addon.expired}</TableCell>
                                <TableCell className={`${addon.expired ? "text-muted" : ""}`} align="right">
                                    <Button disabled={typeof addon.expired === "string"} variant="contained" onClick={() => onDelete(addon)} className={classes.button}>
                                        {typeof addon.expired === "string" ? "Removed" : "Delete"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
}

ProjectSubscriptionManagementAddOnTable.propTypes = {
    pid: PropTypes.string.isRequired,
    setEstAmount: PropTypes.func.isRequired
}