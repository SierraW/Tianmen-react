import React from "react";
import { formatDateMDY } from "../../../../services/datePrintingService";
import { sendConfrimationEmail } from "../../../../services/emailService";

export default function TimelineReservationSuccess({ method, contactInfo, managerEmail, managerDN, userDN, userEmail, date, timeline }) {

    React.useEffect(() => {
        sendConfrimationEmail(managerDN, userDN, userEmail, formatDateMDY(date), timeline, method, contactInfo, managerEmail);
    }, [contactInfo, date, managerDN, managerEmail, method, timeline, userDN, userEmail]);

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