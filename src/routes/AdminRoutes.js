import EstablishmentMyList from "views/Establishment/EstablishmentMyList.js"
import EstablishmentCategoryList from "../views/EstablishmentCategory/EstablishmentCategoryList";
import PurchasedEstablishmentList from "../views/Order/Establishment/PurchasedEstablishmentList";
import AdminDashboardOrder from "../views/Dashboard/Admin/AdminDashboardOrder";
import PreparationStatusList from "../views/PreparationStatus/PreparationStatusList";
import PaymentWayList from "../views/PaymentWay/PaymentWayList";

const routes = [
    {
        path: "/establishment",
        name: "Estabelecimento",
        component: EstablishmentMyList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/category",
        name: "Categoria",
        component: EstablishmentCategoryList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/preparation-status",
        name: "Preparo",
        component: PreparationStatusList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/payment-way",
        name: "Pagamento",
        component: PaymentWayList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/establishment/order/purchasedOrder",
        name: "Pedidos",
        component: PurchasedEstablishmentList,
        layout: "/home",
        profiles: "admin"
    },
    {
        path: "/admin/dashboard/order",
        name: "Indicadores",
        component: AdminDashboardOrder,
        layout: "/home"
    }
];

export default routes;
