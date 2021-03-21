import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import EstablishmentMyList from "views/Establishment/EstablishmentMyList.js"
import EstablishmentCategoryList from "../views/EstablishmentCategory/EstablishmentCategoryList";

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-chart-pie-35",
        component: Dashboard,
        layout: "/home"
    },
    {
        path: "/user",
        name: "Usuários",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/home",
    },
    {
        path: "/establishment",
        name: "Rel. Estabelecimento",
        icon: "nc-icon nc-notes",
        component: EstablishmentMyList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/category",
        name: "Categoria de Estabelecimentos ",
        icon: "nc-icon nc-notes",
        component: EstablishmentCategoryList,
        layout: "/home",
        profiles: "admin"
    },
];

export default routes;
