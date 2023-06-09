/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useContext, useState} from "react";
import {Route, Routes} from "react-router-dom";
// javascript plugin used to create scrollbars on windows

import LoginModal from '../../LoginModal'

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import routes from "../../routes.js";

import ViewContext from "../../ViewContext";


import logo from "../../assets/img/react-logo.png";

var ps;

const Admin = (props) => {

  const vx = useContext(ViewContext);

  const [backgroundColor, setBackgroundColor] =useState('blue');
  const [sidebarOpened, setSidebarOpened] =useState( document.documentElement.className.indexOf("nav-open") !== -1);

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(!sidebarOpened);
  };

  const setInstances = async() => {

  };

  const imgMandel = require("../../images/mandel.gif");

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const handleBgClick = color => {
    setBackgroundColor(color);
  };

  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  if (vx.loggedIn) {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...props}
            routes={routes}
            bgColor="black"
            logo={{
              outterLink: "#",
              text: "RTB4FREE",
              imgSrc: logo
            }}
            toggleSidebar={toggleSidebar}
          />
          <div
            className="main-panel"

            data={backgroundColor}
          >
            <AdminNavbar
              {...props}
              brandText={getBrandText(props.location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
            <Routes>{getRoutes(routes)}</Routes>
            {// we don't want the Footer to be rendered on map page
              props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
      <div
        class="bg_image"
        style={{
          backgroundImage: `url(${imgMandel})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5"
        }}></div>
      <LoginModal callback={setInstances}></LoginModal>
     </>
    );
  }
}

export default Admin;
