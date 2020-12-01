import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyProjectsPage } from "./modules/ProjectOverview/pages/MyProjectsPage";
import { CustomerSupportPage } from "./modules/ProjectGeniusBar/pages/CustomerSupportPage";
import { ProjectCreatorPage } from "./modules/ProjectCreator/pages/ProjectCreatorPage";
import { ProjectSubscriptionPage } from "./modules/ProjectSubscription/pages/ProjectSubscriptionPage";
import { ProjectSubscriptionManagerPage } from "./modules/ProjectSubscription/pages/ProjectSubscriptionManagerPage";
import { VersionPage } from "./modules/Version/pages/VersionPage";
import { ProjectAddOnPage } from "./modules/ProjectSubscription/pages/ProjectAddOnPage";

const TimelinePage = lazy(() => 
  import("./modules/Timeline")
);

const ManagementPage = lazy(() =>
  import("./modules/Management/pages/ManagementPage")
);

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
        <ContentRoute path="/dashboard" component={MyProjectsPage} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/projects" component={MyProjectsPage} />
        <ContentRoute path="/subscription" component={ProjectSubscriptionPage} />
        <ContentRoute path="/version" component={VersionPage} />
        <Route path="/management" component={ManagementPage} />
        <Route path="/timeline" component={TimelinePage} />
        <Route path="/add-on" component={ProjectAddOnPage} />
        <Route path="/support" component={CustomerSupportPage} />
        <Route path="/user-profile" component={UserProfilepage} />
        <Route path="/project-creator/:id" component={ProjectCreatorPage} />
        <Route path="/sm/:id" component={ProjectSubscriptionManagerPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
