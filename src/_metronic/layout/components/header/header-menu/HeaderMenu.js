import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { useSelector } from "react-redux";
import { userSec, pageSec } from "../../../../../services/securityClearanceService";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const history = useHistory();
    const [ isSuperAdmin, setSuperAdmin ] = useState(false);
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        userSec(user)
        .then((result) => {
            if (!pageSec(location.pathname.split("/")[1], result.role_id)) {
                alert("Access denied.")
                history.push("/dashboard");
            }
            if ((result.role_id === 1 || result.role_id === 2) && result.com_id === 1) {
                setSuperAdmin(true);
            } else {
                setSuperAdmin(false);
            }
        })
        .catch(() => {
            alert("Session expired.")
            history.push("/logout");
        })
    })

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
                <NavLink className="menu-link" to="/dashboard">
                    <span className="menu-text">Dashboard</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {/*begin::1 Level*/}
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/subscription')}`}>
                <NavLink className="menu-link" to="/subscription">
                    <span className="menu-text">Browse</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>
            {/*end::1 Level*/}

            {
                isSuperAdmin ? (<li className={`menu-item menu-item-rel ${getMenuItemActive('/act-gen')}`}>
                <NavLink className="menu-link" to="/act-gen">
                    <span className="menu-text">Activation Code</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>) : ''
            }

            {
                isSuperAdmin ? (<li className={`menu-item menu-item-rel ${getMenuItemActive('/news-notifications-manager')}`}>
                <NavLink className="menu-link" to="/news-notifications-manager">
                    <span className="menu-text">News/Notis Manage</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>) : ''
            }

            {
                isSuperAdmin ? (<li className={`menu-item menu-item-rel ${getMenuItemActive('/subscription-manage')}`}>
                <NavLink className="menu-link" to="/subscription-manage">
                    <span className="menu-text">Plan Manage</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>) : ''
            }

            {/* <li className={`menu-item menu-item-rel ${getMenuItemActive('/add-on')}`}>
                <NavLink className="menu-link" to="/add-on">
                    <span className="menu-text">Add-Ons</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li> */}

            {/*begin::1 Level*/}
            {
                isSuperAdmin ? (<li className={`menu-item menu-item-rel ${getMenuItemActive('/add-on-manage')}`}>
                <NavLink className="menu-link" to="/add-on-manage">
                    <span className="menu-text">Add-On Manage</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li>) : ''
            }
            {/*end::1 Level*/}

            {/*begin::1 Level*/}
            {
                isSuperAdmin ? (<li className={`menu-item menu-item-rel ${getMenuItemActive('/project-manager')}`}>
                    <NavLink className="menu-link" to="/project-manager">
                        <span className="menu-text">Project Manager</span>
                        {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                    </NavLink>
                </li>) : ''
            }
            {/*end::1 Level*/}

        </ul>
        {/*end::Header Nav*/}
    </div>;
}
