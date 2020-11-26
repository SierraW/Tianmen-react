/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

export function StickyToolbar() {
  return (
    <>
      <ul className="sticky-toolbar nav flex-column pl-2 pr-2 pt-3 pb-3 mt-4">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="layout-tooltip">Dashboard</Tooltip>}
        >
          <li className="nav-item mb-2" data-placement="left">
            <Link
              to="/dashboard"
              className="btn btn-sm btn-icon btn-bg-light btn-text-primary btn-hover-primary"
            >
              <i className="flaticon2-menu-4"></i>
            </Link>
          </li>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="documentations-tooltip">Browse</Tooltip>}
        >
          <li className="nav-item mb-2" data-placement="left">
            <Link
              to="/subscription"
              className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning"
            >
              <i className="flaticon2-plus-1"></i>
            </Link>
          </li>
        </OverlayTrigger>
      </ul>
    </>
  );
}
