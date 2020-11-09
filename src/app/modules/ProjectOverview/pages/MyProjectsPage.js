import React from "react";
import { ListsWidget10, ListsWidget11 } from "../../../../_metronic/_partials/widgets";
import { useSubheader } from "../../../../_metronic/layout";
import ProjectCard from "../components/ProjectCard";

export const MyProjectsPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Projects Overview");

  return <>
    <div className="row">
      <div className="col-lg-6">
        <ListsWidget10 className="card-stretch gutter-b" />
      </div>
      <div className="col-lg-6">
        <ListsWidget11 className="card-stretch gutter-b" />
      </div>
      
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <ProjectCard></ProjectCard>
        </div>
      </div>
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <ProjectCard></ProjectCard>
        </div>
      </div>
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <ProjectCard></ProjectCard>
        </div>
      </div>
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <ProjectCard></ProjectCard>
        </div>
      </div>
      <div className="col-lg-4 mb-7">
        <div className="d-flex justify-content-center">
          <ProjectCard></ProjectCard>
        </div>
      </div>

    </div>
  </>;
};