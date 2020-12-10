import React, { useState, useEffect } from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import CustomVCModal from "../../Modal/CustomVCModal";
import ProjectAddOnManageForm from "./PAMForm";
import { em_addOn } from "../../../../services/firebaseInit";

const initValue = {
    aid: "",
    name: "",
    des: "",
    price: 0,
    available: true
}

export default function ProjectAddOnManageTable({ className }) {

    const [showInputModal, setShowInputModal] = useState(false);
    const [addOnData, setAddOnData] = useState(initValue);
    const [addOns, setAddOn] = useState([]);

    useEffect(() => {
        updateContent();
    }, [showInputModal])

    function updateContent() {
        em_addOn.get().then((querySnapshot) => {
            var dataArr = [];
            querySnapshot.forEach((doc) => {
                dataArr.push({
                    aid: doc.id,
                    name: doc.data().name,
                    des: doc.data().des,
                    price: doc.data().price,
                    available: doc.data().available
                })
            })
            setAddOn(dataArr);
        })
    }

    function inputContent() {
        return (
            <>
                <ProjectAddOnManageForm aid={addOnData.aid} name={addOnData.name} des={addOnData.des} price={addOnData.price} />
            </>
        )
    }

    function addNewAddOn() {
        setAddOnData(initValue);
        setShowInputModal(true);
    }

    function editAddOn(data) {
        setAddOnData(data);
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
                            Add-on
          </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">
                            Management
          </span>
                    </h3>
                    <div className="card-toolbar">
                        <button
                            onClick={() => addNewAddOn()}
                            className="btn btn-success font-weight-bolder font-size-sm"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-white">
                                <PersonAddIcon
                                    className="h-50 align-self-center"
                                ></PersonAddIcon>
                            </span>
            Add add-on
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
                                    <th style={{ minWidth: "120px" }} > Add-on Name </th>
                                    <th style={{ minWidth: "200px" }}>Description</th>
                                    <th style={{ minWidth: "120px" }}>Regular Price</th>
                                    <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                                        action
                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {addOns.map((data, index) => (
                                    <tr key={index}>
                                        <td className="pl-0">
                                            <label className="checkbox checkbox-lg checkbox-single">
                                                <input type="checkbox" value="1" />
                                                <span></span>
                                            </label>
                                        </td>
                                        <td className="pl-0">
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                {data.name}
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
                                                onClick={() => editAddOn(data)}
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <SettingsIcon />
                                                </span>
                                            </button>
                                            <span
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <CreateIcon />
                                                </span>
                                            </span>
                                            <span
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <DeleteIcon />
                                                </span>
                                            </span>
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
