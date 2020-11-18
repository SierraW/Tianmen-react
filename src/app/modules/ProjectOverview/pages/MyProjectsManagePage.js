import React, { useEffect, useState } from "react";
import ProjectOverviewWidgetNewsList from "../components/POWidgetNewsList";
import ProjectOverviewWidgetNotificationsList from "../components/POWidgetNotificationsList";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { delay } from "../../../../services/delayLoading";
import { useSelector } from "react-redux";

export function MyProjectsManagePage() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("News and Notifications Manager");
  const [loading, setLoading] = useState(true);
  const uid = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    delay().then(() => setLoading(false));
  }, [])

  if (loading) {
    return <LayoutSplashScreen />
  } else {
    return <>
      <div className="row">
        <div className="col-lg-6">
          <ProjectOverviewWidgetNewsList className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6">
          <ProjectOverviewWidgetNotificationsList className="card-stretch gutter-b" />
        </div>

        <div className="col-lg-6">

        </div>

        <div className="col-lg-6">
            
        </div>

      </div>
    </>;
  }
};