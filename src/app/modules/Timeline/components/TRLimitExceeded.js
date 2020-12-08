import React from "react";
import { Link } from "react-router-dom";

export default function TimelineReservationLimitExceeded() {
    
    return <>
        <div className="card card-body">
            <h3 className="m-6 text-center">Appointment Reservation Limit Exceeded</h3>
            <p className="m-6 text-center"><Link to="/timeline/ongoing">View Your Appointment</Link></p>
        </div>
    </>;
}