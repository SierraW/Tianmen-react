import React from "react";
import { NavLink } from "react-router-dom"

export function FooterCompact({
  today,
  footerClasses,
  footerContainerClasses,
}) {
  return (
    <>
      {/* begin::Footer */}
      <div
        className={`footer bg-white py-4 d-flex flex-lg-column  ${footerClasses}`}
        id="kt_footer"
      >
        {/* begin::Container */}
        <div
          className={`${footerContainerClasses} d-flex flex-column flex-md-row align-items-center justify-content-between`}
        >
          {/* begin::Copyright */}
          <div className="text-dark order-2 order-md-1">
            <span className="text-muted font-weight-bold mr-2">
              {today} &copy;
            </span>
            Miracle Planet, Powered By&nbsp;
            <a
              href="https://www.finestudio.ca/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-dark-75 text-hover-primary"
            >
              Finestudio
            </a>
          </div>
          {/* end::Copyright */}
          {` `}
          {/* begin::Nav */}
          <div className="nav nav-dark order-1 order-md-2">
            <NavLink
              to="/version"
              rel="noopener noreferrer"
              className="nav-link pr-3 pl-0"
            >
              About
            </NavLink>
            <a
              href="https://www.finestudio.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link px-3"
            >
              Team
            </a>
            <a
              href="https://finestudio.ca/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link pl-3 pr-0"
            >
              Contact
            </a>
          </div>
          {/* end::Nav */}
        </div>
        {/* end::Container */}
      </div>
      {/* end::Footer */}
    </>
  );
}
