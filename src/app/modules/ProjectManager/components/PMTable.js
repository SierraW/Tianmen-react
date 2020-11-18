import React, { useEffect, useState } from "react";
import ProjectManagerTableItem from "./PMTableItem";
import ProjectManagerTableSearchBar from "./PMTableSearchBar";
import { NavLink } from "react-router-dom";
import { em_chat } from "../../../../services/firebaseInit"

export default function ProjectManagerTable({ className }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    em_chat.orderBy("time", "desc").get().then((querySnapshot) => {
      var result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type
        })
      })
      setItems(result);
    })
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
                  <th style={{ minWidth: "100px" }}>Next Payment</th>
                  <th style={{ minWidth: "100px" }}>Amount</th>
                  <th style={{ minWidth: "80px" }} />
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <ProjectManagerTableItem key={item.id} roomId={item.id} name={item.name} type={item.type}></ProjectManagerTableItem>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
