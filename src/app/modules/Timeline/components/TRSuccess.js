import React from "react";
import {formatDateMDY} from "../../../../services/datePrintingService";

export default function TimelineReservationSuccess({ method, contactInfo, managerEmail, managerDN, userEmail, date, timeline }) {
    


    return <>
        <div className="card card-body">
            <h3 className="m-6 text-center">Appointment Reservation Completed</h3>
            <p className="m-6 text-center">{formatDateMDY(date)} with {managerDN}</p>
            <p className="m-6 text-center">From {timeline.from} to {timeline.to}</p>
            <p className="m-6 text-center">Method: {method}</p>
            <p className="m-6 text-center">A Comfirmation Email will be send to your email.</p>
        </div>
    </>;
}