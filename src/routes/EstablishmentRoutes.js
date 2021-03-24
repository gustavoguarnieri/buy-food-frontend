import UserProfile from "views/User/UserProfile.js";

const routes = [
    {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/home",
    }
];

export default routes;
