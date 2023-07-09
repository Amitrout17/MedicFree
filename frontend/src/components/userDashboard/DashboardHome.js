import React from "react";
import Sidebar from "./Sidebar";
function DashboardHome() {
  return (
    <>
      <div className="dashboardMenu">
        <Sidebar />
        <div className="sidebarContent">
          <p>Hello this is main div</p>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
