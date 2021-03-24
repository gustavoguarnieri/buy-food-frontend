import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import UserService from "services/UserService";

import userRoutes from "../routes/UserRoutes";
import adminRoutes from "../routes/AdminRoutes";
import establishmentRoutes from "../routes/EstablishmentRoutes";

import NotFound from "../components/NotFound";
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/User/UserProfile.js";
import TableList from "views/TableList.js";
import EstablishmentMyList from "views/Establishment/EstablishmentMyList.js"
import EstablishmentEdit from "views/Establishment/EstablishmentEdit.js"
import EstablishmentNew from "views/Establishment/EstablishmentNew.js"
import EstablishmentCategoryList from "../views/EstablishmentCategory/EstablishmentCategoryList";
import EstablishmentCategoryNew from "../views/EstablishmentCategory/EstablishmentCategoryNew";
import EstablishmentCategoryEdit from "../views/EstablishmentCategory/EstablishmentCategoryEdit";
import EstablishmentDeliveryList from "../views/DeliveryTax/EstablishmentDeliveryTaxList";
import EstablishmentDeliveryNew from "../views/DeliveryTax/EstablishmentDeliveryTaxNew";
import EstablishmentDeliveryTaxEdit from "../views/DeliveryTax/EstablishmentDeliveryTaxEdit";
import EstablishmentBusinessHoursList from "../views/BusinessHours/EstablishmentBusinessHoursList";
import EstablishmentBusinessHoursNew from "../views/BusinessHours/EstablishmentBusinessHoursNew";
import EstablishmentBusinessHoursEdit from "../views/BusinessHours/EstablishmentBusinessHoursEdit";
import UserAddressList from "../views/User/Address/UserAddressList";
import UserAddressNew from "../views/User/Address/UserAddressNew";
import UserAddressEdit from "../views/User/Address/UserAddressEdit";

function getRoutes() {
  if (UserService.hasRole("admin")) {
    return adminRoutes
  } else if (UserService.hasRole("establishment")){
    return establishmentRoutes
  } else {
    return userRoutes
  }
}

function Home() {
  const [color] = React.useState("black");
  const location = useLocation();
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} routes={getRoutes()} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>
              <Route exact path="home/dashboard">
                <Dashboard/>
              </Route>
              <Route exact path="/home/user">
                <UserProfile/>
              </Route>
              <Route exact path="/home/table">
                <TableList/>
              </Route>
              <Route exact path="/home/establishment">
                <EstablishmentMyList/>
              </Route>
              <Route exact path="/home/establishment/new">
                <EstablishmentNew/>
              </Route>
              <Route exact path="/home/establishment/edit/:establishmentId">
                <EstablishmentEdit/>
              </Route>
              <Route exact path="/home/establishment/category">
                <EstablishmentCategoryList/>
              </Route>
              <Route exact path="/home/establishment/category/new">
                <EstablishmentCategoryNew/>
              </Route>
              <Route exact path="/home/establishment/category/edit/:establishmentCategoryId">
                <EstablishmentCategoryEdit/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax">
                <EstablishmentDeliveryList/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax/new">
                <EstablishmentDeliveryNew/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax/edit/:establishmentDeliveryId">
                <EstablishmentDeliveryTaxEdit/>
              </Route>
              <Route exact path="/home/establishment/business-hours">
                <EstablishmentBusinessHoursList/>
              </Route>
              <Route exact path="/home/establishment/business-hours/new">
                <EstablishmentBusinessHoursNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/business-hours/edit/:establishmentBusinessHoursId">
                <EstablishmentBusinessHoursEdit/>
              </Route>
              <Route exact path="/home/user/address">
                <UserAddressList/>
              </Route>
              <Route exact path="/home/user/address/new">
                <UserAddressNew/>
              </Route>
              <Route exact path="/home/user/address/edit/:addressId">
                <UserAddressEdit/>
              </Route>
              <Route path="/home/*">
                <NotFound/>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>      
    </>
  );
}

export default Home;
