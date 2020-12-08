import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export default function TimelineOngoingAppointmentWidget({ appointmentObj, isYou, handleDelete }) {

    return <Paper elevation={3} className="text-center m-3 p-6" style={{maxWidth: "300px"}}>
        <p>{appointmentObj.date}</p>
        <p>From {appointmentObj.timeline.from} To {appointmentObj.timeline.to}</p>
        <p>Hosted By { isYou ? (<strong className="text-success">YOU</strong>) : appointmentObj.advisor.display_name }</p>
        <p>
            Via {appointmentObj.contact.method} {appointmentObj.contact.method === "Phone" ? appointmentObj.contact.content : ""}
        </p>
        <p>{appointmentObj.user.display_name}</p>
        <p>{appointmentObj.user.email}</p>
        <Button className="text-danger" onClick={() => handleDelete(appointmentObj.id)}>Cancel</Button>
    </Paper>;
}