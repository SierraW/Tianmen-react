/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { useDispatch } from "react-redux";
import * as cs from "../../../../redux/csRedux";
import { useHistory } from "react-router-dom";

export function TilesWidget14({ className, roomId }) {
  const backgroundImageUrl = toAbsoluteUrl("/media/stock-600x600/img-16.jpg");
  
  const dispatch = useDispatch();
  const history = useHistory();

  function gotoCustomerSupport() {
    console.log("room id is", roomId);
    dispatch(cs.actions.setRoom(roomId));
    history.push("/support");
  }

  return (
    <>
      <div
        className={`card card-custom bgi-no-repeat bgi-size-cover ${className}`}
        style={{
          backgroundImage: `url("${backgroundImageUrl}")`,
        }}
      >
        {/* begin::Body */}
        <div className="card-body d-flex flex-column align-items-start justify-content-start">
          <div className="p-1 flex-grow-1">
            <h3 className="text-white font-weight-bolder line-height-lg mb-5">
              Create Reports
              <br />
              With App
            </h3>
          </div>

          <button
            onClick={gotoCustomerSupport.bind(this)}
            className="btn btn-link btn-link-warning font-weight-bold"
          >
            Create Report
            <span className="svg-icon-lg svg-icon-warning">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Navigation/Arrow-right.svg"
                )}
              />
            </span>
          </button>
        </div>
        {/* end::Body */}
      </div>
    </>
  );
}
