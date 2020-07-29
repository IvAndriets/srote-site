import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsList from "../components/ProductsListComponent/ProductsList";
import OrdersPage from "../components/OredersComponent/OrdersPage";
import IncomePage from "../components/IncomPageComponent/IncomePage";
import OutcomingOrdersPage from "../components/OutcomingOrdesrComponent/OutcomingOrdersPage";

Vue.use(VueRouter);

const routes = [
    {
        path: '/main',
        name: 'ProductList',
        component: ProductsList,
    },
    {
        path: '/order',
        name: 'OrderPage',
        component: OrdersPage
    },
    {
      path: '/income',
      name: 'IncomePage',
      component: IncomePage,
    },
    {
      path: 'outcome',
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
