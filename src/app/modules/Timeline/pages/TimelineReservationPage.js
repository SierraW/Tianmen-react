import React from "react";
import Paper from '@material-ui/core/Paper';
import { useSubheader } from "../../../../_metronic/layout";

export function TimelineReservationPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Reservation");

    return <>
        <div className="card card-body">

            <h3 className="text-center">With whom and when would you like to meet?</h3>
            <div className="d-flex">
                <Paper elevation={3}>Dec 3</Paper>
            </div>
        </div>
    </>;
}