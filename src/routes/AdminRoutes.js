import Dashboard from "views/Dashboard.js";
import UserProfile from "views/User/UserProfile.js";
import EstablishmentMyList from "views/Establishment/EstablishmentMyList.js"
import EstablishmentCategoryList from "../views/EstablishmentCategory/EstablishmentCategoryList";
import PurchasedEstablishmentList from "../views/Order/Establishment/PurchasedEstablishmentList";
import AdminDashboardOrder from "../views/Dashboard/Admin/AdminDashboardOrder";

const routes = [
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
        component: EstablishmentMyList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/category",
        name: "Categoria de Est.",
        component: EstablishmentCategoryList,
        layout: "/home",
        profiles: "admin"
    },
    // {
    //     path: "/establishment/delivery-tax",
    //     name: "Taxa de Entrega",
    //     component: EstablishmentDeliveryList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/establishment/business-hours",
    //     name: "Horário de Funcionamento",
    //     component: EstablishmentBusinessHoursList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/user/address",
    //     name: "Endereço",
    //     component: UserAddressList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/establishment/product",
    //     name: "Produto",
    //     component: ProductList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/establishment/product/ingredient",
    //     name: "Ingrediente",
    //     component: IngredientList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/establishment/product/image",
    //     name: "Product Imagem",
    //     component: ImageList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/establishment/image",
    //     name: "Estabelecimento Imagem",
    //     component: EstablishmentImageList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/user/order/itens",
    //     name: "Produtos",
    //     component: OrderList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    // {
    //     path: "/user/order/purchasedOrder",
    //     name: "Pedidos",
    //     component: PurchasedList,
    //     layout: "/home",
    //     profiles: "admin"
    // },
    {
        path: "/establishment/order/purchasedOrder",
        name: "Pedidos - Est",
        component: PurchasedEstablishmentList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/home"
    },
    {
        path: "/admin/dashboard/order",
        name: "Admin Dashboard",
        component: AdminDashboardOrder,
        layout: "/home"
    },
    // {
    //     path: "/admin/dashboard/billing",
    //     name: "Admin Billing Dashboard",
    //     component: AdminDashboardBillingOrder,
    //     layout: "/home"
    // }
];

export default routes;
