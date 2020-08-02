import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsList from "../components/ProductsListComponent/ProductsList";
import OrdersPage from "../components/OredersComponent/OrdersPage";
import IncomePage from "../components/ProfutPageComponent/ProfitComponent";
import OutcomingOrdersPage from "../components/OutcomingOrdesrComponent/СonsumptionComponent";

Vue.use(VueRouter);

const routes = [
    {
        path: '/product-list',
        name: 'ProductList',
        component: ProductsList,
    },
    {
        path: '/order',
        name: 'OrderPage',
        component: OrdersPage
    },
    {
      path: '/profit',
      name: 'IncomePage',
      component: IncomePage,
    },
    {
      path: '/consumption',
      name: 'OutcomePage',
      component: OutcomingOrdersPage
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
