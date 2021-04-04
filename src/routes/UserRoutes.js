import UserProfile from "views/User/UserProfile.js";
import UserAddressList from "../views/User/Address/UserAddressList";
import ProductList from "../views/Order/User/ProductList";
import PurchasedList from "../views/Order/User/PurchasedList";

const routes = [
    {
        path: "/user",
        name: "Usuário",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/home",
    },
    {
        path: "/user/address",
        name: "Endereço",
        component: UserAddressList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/user/order/itens",
        name: "Produtos",
        component: ProductList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/user/order/purchasedOrder",
        name: "Pedidos",
        component: PurchasedList,
        layout: "/home",
        profiles: "admin"
    }
];

export default routes;
