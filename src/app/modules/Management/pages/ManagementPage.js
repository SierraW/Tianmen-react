import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../../_metronic/layout";
import { ProjectManagerPage } from "../../ProjectManager/pages/ProjectManagerPage";
import { ProjectAddOnManagePage, ProjectSubscriptionManagePage } from "../../ProjectSubscription";
import { MyProjectsManagePage } from "../../ProjectOverview/pages/MyProjectsManagePage";
import { ActGenPage } from "../../ActGen/pages/ActGenPage";

export default function ManagementPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/management"
        to="/management/projects"
      />

      <ContentRoute from="/management/projects" component={ProjectManagerPage} />

      <ContentRoute from="/management/add-on" component={ProjectAddOnManagePage} />

      <ContentRoute from="/management/subscription" component={ProjectSubscriptionManagePage} />

      <ContentRoute from="/management/news-notifications" component={MyProjectsManagePage} />

      <ContentRoute from="/management/act-gen" component={ActGenPage} />

    </Switch>
  );
}
