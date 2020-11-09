import React from "react";
import { useSubheader } from "../../../../_metronic/layout";
import ProjectManagerTable from "../components/PMTable";

export const ProjectManagerPage = () => {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Project Manager");

    return <>
        <div className="row">
            <div className="col-lg-12">
                <ProjectManagerTable></ProjectManagerTable>
            </div>
        </div>

    </>;
} 