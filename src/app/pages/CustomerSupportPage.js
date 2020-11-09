import React, { useState, useEffect } from "react";
import { useSubheader } from "../../_metronic/layout";
import { LayoutSplashScreen } from "../../_metronic/layout";
import { useSelector } from "react-redux";
import ChatPage from "./ChatPage";

export const CustomerSupportPage = () => {
    const suhbeader = useSubheader();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    suhbeader.setTitle("Support");

    const { id } = useSelector((state) => state.cs);
    const uid = useSelector((state) => state.auth.user.id);

    useEffect(() => {
        enableLoading();
        console.log("ids", id, uid);
        if (items.length === 0) {
            setItems(["apple", "pineapple", "orange"]);
        }
        setTimeout(() => {
            disableLoading();
        }, 2000);
    }, [items])

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    if (loading) {
        return <LayoutSplashScreen />
    } else {
        return <>
            {/* begin::Row */}
            <div className="row">
                <div className="col-lg-4">
                    <div className="card card-stretch gutter-b">
                        <div className="card-body">
                            {/* Clients */}
                            <table className="table table-head-custom table-vertical-center" >
                                <thead>
                                    <tr className="text-left">
                                        <th className="pr-0" style={{width: "50px"}}>Clients</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="member in members | filter: {title_id : '!3'}">
                                        <td className="pr-0">
                                            <div className="symbol symbol-50 symbol-light mt-1">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/avatars/001-boy.svg" className="h-75 align-self-end" alt="" />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="pl-0">
                                            <span href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">name</span>
                                            <span className="text-muted font-weight-bold text-muted d-block">title</span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            {/* FS */}
                            <table className="table table-head-custom table-vertical-center" >
                                <thead>
                                    <tr className="text-left">
                                        <th className="pr-0" style={{width: "50px"}}>Finestudio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="member in members | filter: {title_id : '!3'}">
                                        <td className="pr-0">
                                            <div className="symbol symbol-50 symbol-light mt-1">
                                                <span className="symbol-label">
                                                    <img src="assets/media/svg/avatars/001-boy.svg" className="h-75 align-self-end" alt="" />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="pl-0">
                                            <span href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">name</span>
                                            <span className="text-muted font-weight-bold text-muted d-block">title</span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card card-stretch gutter-b">
                        <ChatPage roomId={id} uid={uid} />
                    </div>
                </div>
            </div>

        </>;
    }

};