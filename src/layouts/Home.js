import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import UserService from "services/UserService";

import routes from "routes.js";

function getRoutes() {
  if (UserService.hasRole("admin")) {
    return filterRoutes('admin')
  } else if (UserService.hasRole("establishment")){
    return filterRoutes('establishment')
  } else {
    return filterRoutes('user')
  }
}

//TODO não está filtrando, verificar
function filterRoutes(roleDesc) {
  const finalRoutes = routes
      .filter((r) => {
        console.log("vou filtrar a rota: " + r.name)
        r.profiles
            .filter((p) => {
              console.log("vou filtrar o profile: " + p.name)

              //TODO tive que passar para uma const pelo motivo de não comparar object com string
              const profileName = p.name;

              console.log(p.name)
              profileName === roleDesc
              console.log(profileName === roleDesc)
            })
      });
  console.log(finalRoutes)
  return finalRoutes
}

//TODO filtrando caso não seja uma lista
// function filterRoutes(roleDesc) {
//   return routes.filter((role) => role.profiles === roleDesc);
// }

function Home() {
  const [color, setColor] = React.useState("black");
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const getRoutesByLayout = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
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
        {/*<Sidebar color={color} routes={routes} />*/}
        <Sidebar color={color} routes={getRoutes()} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutesByLayout(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>      
    </>
  );
}

export default Home;
