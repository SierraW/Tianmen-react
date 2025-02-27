import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { TimelineManagePage } from "./pages/TimelineManagePage";
import { TimelineReservationPage } from "./pages/TimelineReservationPage";
import { TimelineOngoingPage } from "./pages/TimelineOngoingPage";
import { TimelineAllOngoingPage } from "./pages/TimelineAllOngoingPage";

export default function ManagementPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/timeline"
        to="/timeline/ongoing"
      />

      <ContentRoute from="/timeline/manage" component={TimelineManagePage} />

      <ContentRoute from="/timeline/reservation" component={TimelineReservationPage} />

      <ContentRoute from="/timeline/ongoing" component={TimelineOngoingPage} />

      <ContentRoute from="/timeline/all" component={TimelineAllOngoingPage} />

    </Switch>
  );
}
