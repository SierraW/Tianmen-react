import React, { useEffect, useState } from "react";
import ProjectOverviewWidgetNewsList from "../components/POWidgetNewsList";
import ProjectOverviewWidgetNotificationsList from "../components/POWidgetNotificationsList";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import ProjectCard from "../components/ProjectCard";
import { em_chat } from "../../../../services/firebaseInit";
import EmptyProjectCard from "../components/EmptyProjectCard";
import { useSelector } from "react-redux";

export const MyProjectsPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Projects Overview");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    var unsubscribe = em_chat.where("attendees", "array-contains", uid).onSnapshot(function (querySnapshot) {
      let rooms = [];
      querySnapshot.forEach(function (doc) {
        rooms.push({
          id: doc.id,
          imgUri: doc.data().head,
          attendees: doc.data().attendees,
          expired: doc.data().expired,
          name: doc.data().name,
          type: doc.data().type,
          time: doc.data().time
        });
      });
      setProjects(rooms);
      setLoading(false);
    });
    return function cleanup() {
      unsubscribe();
    };
  }, [uid]);

  const emptyCard = () => {
    return (
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <EmptyProjectCard></EmptyProjectCard>
        </div>
      </div>
    )
  }

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

        {
          projects.length === 0 ? emptyCard() :
            projects.map(project => (
              <div key={project.id} className="col-lg-4 mb-7">
                <div className="d-flex justify-content-center">
                  <ProjectCard name={project.name} type={project.type} roomId={project.id} imgUri={project.imgUri}></ProjectCard>
                </div>
              </div>
            ))}

      </div>
    </>;
  }
};