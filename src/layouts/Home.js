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
import ProductList from "../views/Product/ProductList"
import ProductNew from "../views/Product/ProductNew";
import ProductEdit from "../views/Product/ProductEdit";
import IngredientList from "../views/Product/Ingredients/IngredientList";
import IngredientNew from "../views/Product/Ingredients/IngredientNew";
import IngredientEdit from "../views/Product/Ingredients/IngredientEdit";
import ImageList from "../views/Product/Image/ProductImageList";
import ProductImageNew from "../views/Product/Image/ProductImageNew";
import ProductImageEdit from "../views/Product/Image/ProductImageEdit";
import EstablishmentImageList from "../views/Establishment/Image/EstablishmentImageList";
import EstablishmentImageNew from "../views/Establishment/Image/EstablishmentImageNew";
import EstablishmentImageEdit from "../views/Establishment/Image/EstablishmentImageEdit";
import OrderList from "../views/Order/User/ProductOrderList";
import OrderCart from "../views/Order/User/OrderCart";
import PurchasedOrderList from "../views/Order/User/PurchasedOrderList";
import PurchasedOrderListDetailsUser from "../views/Order/User/PurchasedOrderListDetailsUser";

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
              <Route exact path="/home/establishment/:establishmentId/edit">
                <EstablishmentEdit/>
              </Route>
              <Route exact path="/home/establishment/category">
                <EstablishmentCategoryList/>
              </Route>
              <Route exact path="/home/establishment/category/new">
                <EstablishmentCategoryNew/>
              </Route>
              <Route exact path="/home/establishment/category/:establishmentCategoryId/edit">
                <EstablishmentCategoryEdit/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax">
                <EstablishmentDeliveryList/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax/new">
                <EstablishmentDeliveryNew/>
              </Route>
              <Route exact path="/home/establishment/delivery-tax/:establishmentDeliveryId/edit">
                <EstablishmentDeliveryTaxEdit/>
              </Route>
              <Route exact path="/home/establishment/business-hours">
                <EstablishmentBusinessHoursList/>
              </Route>
              <Route exact path="/home/establishment/business-hours/new">
                <EstablishmentBusinessHoursNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/business-hours/:establishmentBusinessHoursId/edit">
                <EstablishmentBusinessHoursEdit/>
              </Route>
              <Route exact path="/home/user/address">
                <UserAddressList/>
              </Route>
              <Route exact path="/home/user/address/new">
                <UserAddressNew/>
              </Route>
              <Route exact path="/home/user/address/:addressId/edit">
                <UserAddressEdit/>
              </Route>
              <Route exact path="/home/establishment/product">
                <ProductList/>
              </Route>
              <Route exact path="/home/establishment/product/new">
                <ProductNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/product/:productId/edit">
                <ProductEdit/>
              </Route>
              <Route exact path="/home/establishment/product/ingredient">
                <IngredientList/>
              </Route>
              <Route exact path="/home/establishment/product/ingredient/new">
                <IngredientNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/product/:productId/ingredient/:ingredientId/edit">
                <IngredientEdit/>
              </Route>
              <Route exact path="/home/establishment/product/image">
                <ImageList/>
              </Route>
              <Route exact path="/home/establishment/product/image/new">
                <ProductImageNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/product/:productId/image/:imageId/edit">
                <ProductImageEdit/>
              </Route>
              <Route exact path="/home/establishment/image">
                <EstablishmentImageList/>
              </Route>
              <Route exact path="/home/establishment/image/new">
                <EstablishmentImageNew/>
              </Route>
              <Route exact path="/home/establishment/:establishmentId/image/:imageId/edit">
                <EstablishmentImageEdit/>
              </Route>
              <Route exact path="/home/order/itens">
                <OrderList/>
              </Route>
              <Route exact path="/home/order/cart">
                <OrderCart/>
              </Route>
              <Route exact path="/home/order/purchasedOrder">
                <PurchasedOrderList/>
              </Route>
              <Route exact path="/home/order/purchased-order/:orderId/details">
                <PurchasedOrderListDetailsUser/>
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
