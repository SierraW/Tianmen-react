import React, { useEffect, useState } from "react";
import ProjectManagerTableItem from "./PMTableItem";
import ProjectManagerTableSearchBar from "./PMTableSearchBar";
import { NavLink } from "react-router-dom";
import { em_chat } from "../../../../services/firebaseInit";
import { projectStatus } from '../../ProjectSubscription/data/PaymentTypeData';

export default function ProjectManagerTable({ className }) {

  const [items, setItems] = useState([]);

  useEffect(() => {

    (async () => {
      var rawResultItems = []
      await em_chat.orderBy("time", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const project = doc.data().project;
          rawResultItems.push({
            pid: doc.id,
            name: doc.data().name,
            type: doc.data().type,
            status: project ? project.status : 0,
            start: project ? project.start : "Not Set",
            due: project ? project.due : "Not Set",
            end: project ? project.end : "Not Set"
          })
        })
      })

      setItems(rawResultItems);
    })();

  }, [])

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <ProjectManagerTableSearchBar></ProjectManagerTableSearchBar>
        </h3>
        <div className="card-toolbar">
          <NavLink className="btn btn-primary font-weight-bolder font-size-sm" to="/project-creator/New Project">Create</NavLink>
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{ minWidth: "80px" }}><span className="text-dark-75">Project</span></th>
                  <th style={{ minWidth: "50px" }}>Status</th>
                  <th style={{ minWidth: "100px" }}>Since / Due</th>
                  <th style={{ minWidth: "100px" }}>Delivered</th>
                  <th style={{ minWidth: "100px" }}>Last Payment</th>
                  <th style={{ minWidth: "100px" }}>Amount</th>
                  <th style={{ minWidth: "100px" }}>Next Payment</th>
                  <th style={{ minWidth: "80px" }} />
                </tr>
              </thead>
              <tbody>
                {
                  items.map(item => (
                    <ProjectManagerTableItem key={item.pid} roomId={item.pid} name={item.name} type={item.type} status={projectStatus[item.status].name} start={item.start} end={item.end} due={item.due} ></ProjectManagerTableItem>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
