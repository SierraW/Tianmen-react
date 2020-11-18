import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { em_room } from "../../../../services/firebaseInit";
import * as cs from "../../../../redux/csRedux";

export default function ProjectManagerTableItem({ roomId, name, type }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // numOfNewMsgs, lastMsgBody, lastMsgName, attendersFs, attendersCus
    useEffect(() => {

    }, [])

    var enterProject = function () {
        dispatch(cs.actions.setRoom(roomId));
        history.push("/support");
    }

    return <>
        <tr>
            <td className="pl-0 py-8">
                <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label">
                            <span className="svg-icon h-75 align-self-end">
                                {name[0]}
                            </span>
                        </span>
                    </div>
                    <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{name}</a>
                        <span className="text-muted font-weight-bold d-block">{type}</span>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    制作中
                </span>
                <span className="text-muted font-weight-bold">
                    Nelson!
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    2020-01-01
                </span>
                <span className="text-muted font-weight-bold">
                    2020-02-02
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    TBD
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    2020-10-10
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    2020-11-10
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    $4000
                </span>
            </td>
            <td className="pr-0 text-right">
                <NavLink className="btn btn-light-danger font-weight-bolder font-size-sm mr-3" to={`/project-creator/${roomId}`}>Manage</NavLink>
                <div className="btn btn-light-success font-weight-bolder font-size-sm mr-3" onClick={enterProject}>Enter Room</div>
            </td>
        </tr>
    </>
}

ProjectManagerTableItem.propTypes = {
    roomId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}