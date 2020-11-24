import React, { useState, useEffect } from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import CustomVCModal from "../../Modal/CustomVCModal";
import ProjectOverviewHybridForm from "./POHybridForm";
import { getNews, deleteNews,  getNaughtys, deleteNaughtys } from "../../../../services/infoService";
import { useSelector } from "react-redux";


const initValue = {
    id: "",
    title: "",
    subtitle: "",
    url: "",
    date: "",
}

export default function ProjectOverviewHybridTable({ className, type }) {
    // type 0: news, type 1: naughtys
    const [showInputModal, setShowInputModal] = useState(false);
    const [itemData, setItemData] = useState(initValue);
    const [items, setItems] = useState([]);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        updateContent();
    }, [showInputModal])

    function updateContent() {
        if (type === 0) {
            getNews().then(data => setItems(data));
        } else {
            getNaughtys().then(data => setItems(data));
        }
    }

    function inputContent() {
        return (
            <>
                <ProjectOverviewHybridForm session={user.user_session} type={type} hid={itemData.id} title={itemData.title} subtitle={itemData.subtitle} url={itemData.url} date={itemData.date} />
            </>
        )
    }

    function addNewItem() {
        setItemData(initValue);
        setShowInputModal(true);
    }

    function editItem(data) {
        setItemData(data);
        setShowInputModal(true);
    }

    function deleteItem(id) {
        if (type === 0) {
            deleteNews(user.user_session, id)
            .then(() => alert("Success!"));
        } else {
            deleteNaughtys(user.user_session, id)
            .then(() => alert("Success!"))
        }
        updateContent();
    }

    return (
        <>
            <CustomVCModal body={inputContent} show={showInputModal} onHide={() => setShowInputModal(false)}></CustomVCModal>
            <div className={`card card-custom ${className}`}>
                {/* begin::Header */}
                <div className="card-header border-0 py-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label font-weight-bolder text-dark">
                            {type === 0 ? "News" : "Notifications"}
          </span>
                        <span className="text-muted mt-3 font-weight-bold font-size-sm">
                            Management
          </span>
                    </h3>
                    <div className="card-toolbar">
                        <button
                            onClick={() => addNewItem()}
                            className="btn btn-success font-weight-bolder font-size-sm"
                        >
                            <span className="svg-icon svg-icon-md svg-icon-white">
                                <PersonAddIcon
                                    className="h-50 align-self-center"
                                ></PersonAddIcon>
                            </span>
                            {type === 0 ? "Add news" : "Add notifications"}
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
                                    <th style={{ minWidth: "100px" }} >Title</th>
                                    <th style={{ minWidth: "150px" }} >Subtitle</th>
                                    <th style={{ minWidth: "200px" }}>url</th>
                                    <th style={{ minWidth: "120px" }}>date</th>
                                    <th className="pr-0 text-right" style={{ minWidth: "150px" }}>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((data, index) => (
                                    <tr key={index}>
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
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                {data.url}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                {data.date}
                                            </span>
                                        </td>
                                        <td className="pr-0 text-right">
                                            <button
                                                onClick={() => editItem(data)}
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon svg-icon-md svg-icon-primary">
                                                    <SettingsIcon />
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => deleteItem(data.id)}
                                                className="btn btn-icon btn-light btn-hover-primary btn-sm"
                                            >
                                                <span className="svg-icon ml-3 svg-icon-md svg-icon-primary">
                                                    <DeleteIcon />
                                                </span>
                                            </button>
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
