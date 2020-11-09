import React from "react";
import { NavLink } from "react-router-dom";

export default function ProjectManagerTableItem() {
    return <>
        <tr>
            <td className="pl-0 py-8">
                <div className="d-flex align-items-center">
                    <div className="symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label">
                            <span className="svg-icon h-75 align-self-end">
                                Duo
                            </span>
                        </span>
                    </div>
                    <div>
                        <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">Duotuan</a>
                        <span className="text-muted font-weight-bold d-block">mini App</span>
                    </div>
                </div>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    0
                      </span>
                <span className="text-muted font-weight-bold">
                    新消息
                      </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    进度如何了
                      </span>
                <span className="text-muted font-weight-bold">
                    Nelson
                      </span>
            </td>
            <td>
                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                    Nelson, Nelson, Nelson...
                      </span>
                <span className="text-muted font-weight-bold">
                    Nelson, Nelson, Nelson...
                      </span>
            </td>
            <td className="pr-0 text-right">
                <NavLink className="btn btn-light-danger font-weight-bolder font-size-sm mr-3" to="/project-creator">Manage</NavLink>
                <NavLink className="btn btn-light-success font-weight-bolder font-size-sm mr-3" to="/support">Enter Room</NavLink>
            </td>
        </tr>
    </>
}