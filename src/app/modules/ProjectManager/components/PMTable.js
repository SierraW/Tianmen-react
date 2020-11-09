import React from "react";
import ProjectManagerTableItem from "./PMTableItem";
import ProjectManagerTableSearchBar from "./PMTableSearchBar";


export default function ProjectManagerTable({ className }) {
  return (
      <div className={`card card-custom ${className}`}>
        {/* Head */}
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <ProjectManagerTableSearchBar></ProjectManagerTableSearchBar>
          </h3>
          <div className="card-toolbar">
            <a href="#" className="btn btn-primary font-weight-bolder font-size-sm">Create</a>
          </div>
        </div>
        {/* Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{minWidth: "80px"}}><span className="text-dark-75">Project</span></th>
                  <th style={{minWidth: "50px"}}></th>
                  <th style={{minWidth: "250px"}}>Last Message</th>
                  <th style={{minWidth: "200px"}}>Attender</th>
                  <th style={{minWidth: "80px"}}/>
                </tr>
                </thead>
                <tbody>
                <ProjectManagerTableItem></ProjectManagerTableItem>
                <ProjectManagerTableItem></ProjectManagerTableItem>
                <ProjectManagerTableItem></ProjectManagerTableItem>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
