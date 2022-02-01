import { Link } from "react-router-dom";
import { Component } from "react";
import SideNavbar from "../navbar/SideNavbar";
import Header from "./Header";


class Dashboard extends Component {
  render() {
    return (
      <div className="left-row-container">
        <SideNavbar />

        <main>
          <Header title="Overview" subtitle={`Account: `} />
        </main>
      </div>
    );
  }
}


export default Dashboard;