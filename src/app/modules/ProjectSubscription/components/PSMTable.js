import React, { useState, useEffect } from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import CustomVCModal from "../../Modal/CustomVCModal";
import ProjectSubscriptionManageForm from "./PSMForm";
import { em_project } from "../../../../services/firebaseInit";

const initValue = {
    pid: "",
    title: "",
    subtitle: "",
    des: "",
    price: "",
    available: true
}

export default function ProjectSubscriptionManageTable({ className }) {

    const [showInputModal, setShowInputModal] = useState(false);
    const [projectData, setProjectData] = useState(initValue);
    const [pds, setPds] = useState([]);

    useEffect(() => {
        updateContent();
    }, [showInputModal])

    function updateContent() {
        em_project.get().then((querySnapshot) => {
            var dataArr = [];
            querySnapshot.forEach((doc) => {
                dataArr.push({
                    pid: doc.id,
                    title: doc.data().title,
                    subtitle: doc.data().subtitle,
                    des: doc.data().des,
                    price: doc.data().price,
                    available: doc.data().available
                })
            })
            setPds(dataArr);
        })
    }

    function inputContent() {
        return (
            <>
                <ProjectSubscriptionManageForm pid={projectData.pid} title={projectData.title} subtitle={projectData.subtitle} des={projectData.des} price={projectData.price} />
            </>
        )
    }

    function addNewPD() {
        setProjectData(initValue);
        setShowInputModal(true);
    }

    function editPD(data) {
        setProjectData(data);
        setShowInputModal(true);
    }

    return (
        <>
            <CustomVCModal body={inputContent} show={showInputModal} onHide={() => setShowInputModal(false)}></CustomVCModal>
            <div className={`card card-custom ${className}`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">
                            Plan
          </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">
                            Management
          </span>
                    </h3>
                    <div className="card-toolbar">
                        <button
                            onClick={() => addNewPD()}
                            className="btn btn-success font-weight-bolder font-size-sm"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-white">
                                <PersonAddIcon
                                    className="h-50 align-self-center"
                                ></PersonAddIcon>
                            </span>
            Add plan
          </button>
                    </div>
                </div>
                {/* end::Header */}

                {/* begin::Body */}
                <div className="card-body py-0">
                    {/* begin::Table */}
                    <div className="table-responsive">
                        <table
                            className="table table-head-custom table-vertical-center"
                            id="kt_advance_table_widget_1"
                        >
                            <thead>
                                <tr className="text-left">
                                    <th className="pl-0" style={{ width: "20px" }}>
                                        <label className="checkbox checkbox-lg checkbox-single">
                                            <input type="checkbox" value="1" />
                                            <span></span>
                                        </label>
                                    </th>
                                    <th style={{ minWidth: "100px" }} >Title</th>
                                    <th style={{ minWidth: "150px" }} >Subtitle</th>
                                    <th style={{ minWidth: "200px" }}>Description</th>
                                    <th style={{ minWidth: "120px" }}>Regular Price</th>
                                    <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                        action
                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pds.map((data, index) => (
                                    <tr key={index}>
                                        <td className="pl-0">
                                            <label className="checkbox checkbox-lg checkbox-single">
                                                <input type="checkbox" value="1" />
                                                <span></span>
                                            </label>
                                        </td>
                                        <td className="pl-0">
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                {data.title}
                                            </span>
                                        </td>
                                        <td className="pl-0">
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                {data.subtitle}
                                            </span>
                                        </td>
                                        <td>
                                            <ul className="ml-0 pl-0">
                                                {data.des.split(/\r?\n/).map((sec, index) => (<li key={index}>{sec}</li>))}
                                            </ul>
                                        </td>
                                        <td>
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                CAD${data.price}
                        </span>
                                        </td>
                                        <td className="pr-0 text-right">
                                            <button
                                                onClick={() => editPD(data)}
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <SettingsIcon />
                                                </span>
                                            </button>
                                            <a
                                                href="#"
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <CreateIcon />
                                                </span>
                                            </a>
                                            <a
                                                href="#"
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <DeleteIcon />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* end::Table */}
                </div>
                {/* end::Body */}
            </div>
        </>
    );
}
