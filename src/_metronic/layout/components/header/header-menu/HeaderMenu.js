import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { useSelector } from "react-redux";
import { userSec, pageSec, manSec } from "../../../../../services/securityClearanceService";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const history = useHistory();
    const [isSuperAdmin, setSuperAdmin] = useState(false);
    const [isManager, setManager] = useState(false);
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    };
    const user = useSelector((state) => state.auth.user);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        userSec(user)
            .then((result) => {
                if (!pageSec(location.pathname, result.role_id) || !manSec(location.pathname, result.title_id)) {
                    MySwal.fire(<p className="text-warning">Access Denied</p>, <p>Redirecting you to main page...</p>, 'warning');
                    history.push("/dashboard")
                }
                if ((result.role_id === 1 || result.role_id === 2) && result.com_id === 1) {
                    setSuperAdmin(true);
                } else {
                    setSuperAdmin(false);
                }
                if ((result.title_id === 1 || result.title_id === 6 || result.role_id === 8) && result.com_id === 1) {
                    setManager(true);
                } else {
                    setManager(false);
                }
            })
            .catch(() => {
                MySwal.fire(<p className="text-danger">Session Expired</p>, <p>Please sign in again.</p>, 'error').then(() => history.push("/logout"));
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

            <li
                data-menu-toggle={layoutProps.menuDesktopToggle}
                aria-haspopup="true"
                className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/timeline')}`}>
                <NavLink className="menu-link menu-toggle" to="/timeline">
                    <span className="menu-text">Appointment</span>
                    <i className="menu-arrow"></i>
                </NavLink>
                <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/timeline/ongoing')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link" to="/timeline/ongoing">
                                <span className="menu-text">My Appointments</span>
                                {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                            </NavLink>
                        </li>
                        <li
                            className={`menu-item menu-item-submenu ${getMenuItemActive('/timeline/reservation')}`}
                            data-menu-toggle="hover"
                            aria-haspopup="true"
                        >
                            <NavLink className="menu-link" to="/timeline/reservation">
                                <span className="menu-text">Make An Appointment</span>
                                {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                            </NavLink>
                        </li>
                        {isManager ? (
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/timeline/manage')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/timeline/manage">
                                    <span className="menu-text">Timeline Management</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                        ) : ""}
                        {
                            isSuperAdmin ? (
                                <li
                                    className={`menu-item menu-item-submenu ${getMenuItemActive('/timeline/all')}`}
                                    data-menu-toggle="hover"
                                    aria-haspopup="true"
                                >
                                    <NavLink className="menu-link" to="/timeline/all">
                                        <span className="menu-text">All Appointments</span>
                                        {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                    </NavLink>
                                </li>
                            ) : ""
                        }
                    </ul>
                </div>
            </li>

            {
                isSuperAdmin ? (<li
                    data-menu-toggle={layoutProps.menuDesktopToggle}
                    aria-haspopup="true"
                    className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/management')}`}>
                    <NavLink className="menu-link menu-toggle" to="/management">
                        <span className="menu-text">Management</span>
                        <i className="menu-arrow"></i>
                    </NavLink>
                    <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                        <ul className="menu-subnav">
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/management/act-gen')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/management/act-gen">
                                    <span className="menu-text">Activation Code</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/management/news-notifications')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/management/news-notifications">
                                    <span className="menu-text">News/Notice Manage</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/management/subscription')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/management/subscription">
                                    <span className="menu-text">Plan Manage</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/management/add-on')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/management/add-on">
                                    <span className="menu-text">Add-On Manage</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive('/management/projects')}`}
                                data-menu-toggle="hover"
                                aria-haspopup="true"
                            >
                                <NavLink className="menu-link" to="/management/projects">
                                    <span className="menu-text">Projects Manage</span>
                                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </li>) : ''
            }

            {/* <li className={`menu-item menu-item-rel ${getMenuItemActive('/add-on')}`}>
                <NavLink className="menu-link" to="/add-on">
                    <span className="menu-text">Add-Ons</span>
                    {layoutProps.rootArrowEnabled && (<i className="menu-arrow" />)}
                </NavLink>
            </li> */}

        </ul>
        {/*end::Header Nav*/}
    </div>;
}
