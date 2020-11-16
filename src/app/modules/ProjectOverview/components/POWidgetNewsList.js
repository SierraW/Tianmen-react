import React, { useEffect, useState } from "react";
import { getNews } from "../../../../services/infoService";

export default function ProjectOverviewWidgetNewsList({ className }) {

    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews()
            .then(data => setNews(data))
            .catch(err => alert(err))
    }, [])

    return (
        <>
            <div className={`card card-custom ${className}`}>
                {/* Header */}
                <div className="card-header border-0">
                    <h3 className="card-title font-weight-bolder text-dark">
                        News
          </h3>
                </div>

                {/* Body */}
                <div className="card-body pt-0">
                    {news.map((item, index) => (
                        <div key={index} className="mb-6">
                            <div className="d-flex align-items-center flex-grow-1">
                                <label className="checkbox checkbox-lg checkbox-lg checkbox-single flex-shrink-0 mr-4">
                                    <input type="checkbox" value="1" />
                                    <span></span>
                                </label>

                                <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
                                    <div className="d-flex flex-column align-items-cente py-2 w-75">
                                        <a
                                            href={item.url}
                                            className="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                                        >
                                            {item.title}
                                        </a>

                                        <span className="text-muted font-weight-bold">
                                            {item.date}
                                        </span>
                                    </div>

                                    <span className={`label label-lg label-light-${item.color} label-inline font-weight-bold py-4`}>
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
