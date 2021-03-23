import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import EstablishmentMyList from "views/Establishment/EstablishmentMyList.js"
import EstablishmentCategoryList from "../views/EstablishmentCategory/EstablishmentCategoryList";
import EstablishmentDeliveryList from "../views/DeliveryTax/EstablishmentDeliveryTaxList";
import EstablishmentBusinessHoursList from "../views/BusinessHours/EstablishmentBusinessHoursList";

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
        name: "Categoria de Est.",
        icon: "nc-icon nc-notes",
        component: EstablishmentCategoryList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/delivery-tax",
        name: "Taxa de Entrega",
        icon: "nc-icon nc-notes",
        component: EstablishmentDeliveryList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/business-hours",
        name: "Horário de Funcionamento",
        icon: "nc-icon nc-notes",
        component: EstablishmentBusinessHoursList,
        layout: "/home",
        profiles: "admin"
    }
];

export default routes;
