import UserProfile from "views/UserProfile.js";
import EstablishmentMyList from "../views/Establishment/EstablishmentMyList";
import EstablishmentEdit from "../views/Establishment/EstablishmentEdit";

const routes = [
    {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/home",
    },
    {
        path: "/establishment",
        name: "Lista Estabelecimento",
        icon: "nc-icon nc-notes",
        component: EstablishmentMyList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/:establishmentId",
        name: "Alterar Estabelecimento",
        icon: "nc-icon nc-notes",
        component: EstablishmentEdit,
        layout: "/home",
        profiles: "admin"
    },
];

export default routes;
