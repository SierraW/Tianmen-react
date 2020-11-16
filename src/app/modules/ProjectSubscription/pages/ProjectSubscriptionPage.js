import React, { useEffect, useState } from "react";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { useSelector } from "react-redux";
import ProjectSubscriptionCard from "../components/ProjectSubscriptionCard";
import { delay } from "../../../../services/delayLoading";

export const ProjectSubscriptionPage = () => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("Projects Overview");
    const [loading, setLoading] = useState(true);
    const uid = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        delay().then(setLoading(false));
    }, [])

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            <div className="row">
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
                <ProjectSubscriptionCard className="col-lg-4 my-4" />
            </div>
        </>;
    }
};