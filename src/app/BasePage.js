import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyProjectsPage } from "./modules/ProjectOverview/pages/MyProjectsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CustomerSupportPage } from "./pages/CustomerSupportPage";
import { ProjectCreatorPage } from "./modules/ProjectCreator/pages/ProjectCreatorPage";
import { ProjectManagerPage } from "./modules/ProjectManager/pages/ProjectManagerPage";

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/projects" component={MyProjectsPage} />
        <ContentRoute path="/project-manager" component={ProjectManagerPage} />
        <Route path="/support" component={CustomerSupportPage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/project-creator" component={ProjectCreatorPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
