import React from "react";
import SideBar from "./SideBar";

function Layout({ Children }) {
  return (
    <div style={{ backgroundColor: "#f4f9fd" }}>
      <div className="row me-0" style={{ padding: "24px" }}>
        <div className="col-md-2">
          <SideBar />
        </div>
        <div className="col-md-10">{Children}</div>
      </div>
    </div>
  );
}

export default Layout;
