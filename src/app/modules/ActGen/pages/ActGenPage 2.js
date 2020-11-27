import React from "react";
import { useSubheader } from "../../../../_metronic/layout";
import ActGenForm from "../components/ActGenForm";

export function ActGenPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Activation Code Generator");

    return <>
        <div className="row">
            <div className="card col">
                <div className="card-body">
                    <ActGenForm />
                </div>
            </div>
        </div>
    </>;
}