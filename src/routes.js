import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-chart-pie-35",
        component: Dashboard,
        layout: "/home",
        //profiles: "admin"
        profiles: [
            {
                name: "admin"
            },
            {
                name: "stablishment"
            }
        ]
    },
    {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/home",
        //profiles: "user"
        profiles: [
            {
                name: "user"
            }
        ]
    }
];

export default dashboardRoutes;
