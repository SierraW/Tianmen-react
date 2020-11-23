import React, {useEffect, useState} from "react";
import { useSubheader } from "../../../../_metronic/layout";
import VersionCard from "../components/VersionCard";
import jsonData from '../data/versionData.json';

const loadData = () => JSON.parse(JSON.stringify(jsonData));

export function VersionPage() {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Version");
    const versionData = loadData();

    return <>
        <div className="row">
            {versionData.map((data, index) => (
                <VersionCard key={index} className="col-lg-4 my-6" title={data.version} fix={data.fix} update={data.update} add={data.add} />
            ))}
        </div>
    </>;
}