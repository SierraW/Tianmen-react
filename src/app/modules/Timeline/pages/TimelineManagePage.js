import React, {useEffect, useState} from "react";
import { useSubheader } from "../../../../_metronic/layout";
import TimelineManageForm from "../components/TimelineManageForm";

export function TimelineManagePage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Timeline Management");

    return <>
        <div className="row">
            <div className="col-lg-12 card card-body">
                <TimelineManageForm />
            </div>
        </div>
    </>;
}