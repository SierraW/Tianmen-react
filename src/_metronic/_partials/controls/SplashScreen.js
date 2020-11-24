import React from "react";
import {CircularProgress} from "@material-ui/core";


export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        {/* <img
          src={toAbsoluteUrl("/media/logos/logo-mini-md.png")}
          alt="Metronic logo"
        /> */}
        <h3>FS</h3>
        <CircularProgress className="splash-screen-spinner" />
      </div>
    </>
  );
}
