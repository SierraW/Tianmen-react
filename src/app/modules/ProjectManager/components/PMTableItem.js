import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { em_payment } from "../../../../services/firebaseInit";
import * as cs from "../../../../redux/csRedux";
import { formatDate } from "../../../../services/datePrintingService";

export default function ProjectManagerTableItem({ roomId, name, type, status, start, end, due }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [date, setDate] = useState("...");
    const [amount, setAmount] = useState(0);
    // numOfNewMsgs, lastMsgBody, lastMsgName, attendersFs, attendersCus
    useEffect(() => {
        em_payment(roomId).orderBy("date", "desc").limit(1).get().then((querySnapshot) => {
            if (querySnapshot.size === 1) {
                querySnapshot.forEach((doc) => {
                    setDate(doc.data().date);
                    setAmount(doc.data().amount);
                })
            }
        })
    }, [])

    var enterProject = function () {
        dispatch(cs.actions.setRoom(roomId));
        history.push("/support");
    }

    function getNextBillDate() {
        if (date === "...") {
            return "...";
        } else {
            var ndate = new Date(date);
            ndate.setMonth(ndate.getMonth() + 1);
            ndate.setDate(ndate.getDate() + 1);
            return formatDate(ndate);
        }
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
                    {status}
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {start}
                </span>
                <span className="text-muted font-weight-bold">
                    {due}
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {end}
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {date}
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    ${amount}
                </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    {getNextBillDate()}
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
    status: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
}