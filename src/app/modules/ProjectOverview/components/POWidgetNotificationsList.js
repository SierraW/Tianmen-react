import React, { useEffect, useState } from "react";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNaughtys } from "../../../../services/infoService";

export default function ProjectOverviewWidgetNotificationsList({ className }) {

    const [naughtys, setNaughty] = useState([]);

    useEffect(() => {
        getNaughtys().then(data => setNaughty(data)).catch(err => alert(err));
    }, [])

    return (
        <>
            <div className={`card card-custom ${className}`}>
                {/* Header */}
                <div className="card-header border-0">
                    <h3 className="card-title font-weight-bolder text-dark">Trends</h3>
                </div>

                {/* Body */}
                <div className="card-body pt-0">

                    {naughtys.map((naughty, index) => (
                        <div key={index} className={`d-flex align-items-center mb-9 bg-light-${naughty.color} rounded p-5`}>
                            <span className="svg-icon svg-icon-warning mr-5 svg-icon-lg">
                                <NotificationsIcon />
                            </span>

                            <div className="d-flex flex-column flex-grow-1 mr-2">
                                <a
                                    href="#"
                                    className="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
                                >
                                    {naughty.title}
                                </a>
                                <span className="text-muted font-weight-bold">{naughty.date}</span>
                            </div>

                            <span className={`font-weight-bolder text-${naughty.color} py-1 font-size-lg`}>
                                {naughty.subtitle}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
