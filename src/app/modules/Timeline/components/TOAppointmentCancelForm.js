import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function TimelineOngoingAppointmentCancelForm({ onSubmit }) {
    const [reason, setReason] = React.useState("");

    function handleSubmit() {
        onSubmit(reason);
    }

    return <>
        <h3 className="my-3 text-center">Are You Sure?</h3>
        <p className="my-3 text-center">Customer will be notified by email.</p>

        <div className="d-flex flex-column justify-content-center">
            <TextField className="my-3" label="Reason Of Cancel" fullWidth variant="outlined" size="small" value={reason} onChange={(e) => setReason(e.target.value)}></TextField>
            <Button onClick={() => handleSubmit()} className="mt-3 text-danger">Confirm Cancel</Button>
        </div>
    </>;
}