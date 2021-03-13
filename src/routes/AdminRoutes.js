import Dashboard from "views/Dashboard.js";
import CustomUserProfile from "views/CustomUserProfile.js";
import TableList from "views/TableList.js";

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-chart-pie-35",
        component: Dashboard,
        layout: "/home"
    },
    {
        path: "/customUser",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: CustomUserProfile,
        layout: "/home",
    },
    {
        path: "/table",
        name: "Table List",
        icon: "nc-icon nc-notes",
        component: TableList,
        layout: "/home",
        profiles: "admin"
    },
];

export default routes;
