import React, { useEffect, useState } from "react";
import { ListsWidget10, ListsWidget11 } from "../../../../_metronic/_partials/widgets";
import { useSubheader } from "../../../../_metronic/layout";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import ProjectCard from "../components/ProjectCard";
import { em_chat, timestamp } from "../../../../services/firebaseInit";
import EmptyProjectCard from "../components/EmptyProjectCard";
import { useSelector } from "react-redux";

export const MyProjectsPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Projects Overview");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    em_chat.where("attenders", "array-contains", uid).onSnapshot(function (querySnapshot) {
      let rooms = [];
      querySnapshot.forEach(function (doc) {
        rooms.push({
          id: doc.id,
          imgUri: doc.data().imgUri,
          attenders: doc.data().attenders,
          expired: doc.data().expired,
          last_act_time: doc.data().last_act_time.toDate(),
          name: doc.data().name,
          type: doc.data().type,
          time: doc.data().time
        });
      });
      setProjects(rooms);
      setLoading(false);
    });
  }, [])

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
          <ListsWidget10 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6">
          <ListsWidget11 className="card-stretch gutter-b" />
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