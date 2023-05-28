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
import ReactDOM from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import AdminLayout from "./layouts/Admin/Admin.jsx";

import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";

import LoginModal from './LoginModal'
import {ViewContextProvider} from './ViewContext'

// document.body.classList.add("white-content");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ViewContextProvider>
      <Routes>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
        <Route path="/" element={ <Navigate to="/admin/dashboard" /> } />
      </Routes>
    </ViewContextProvider>
  </BrowserRouter>
);
