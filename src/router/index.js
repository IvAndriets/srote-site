import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsList from "../components/Products/ProductsListComponent";
import ProductDetailsComponent from "../components/Products/ProductDetailsComponent";

Vue.use(VueRouter);

const routes = [
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductsList,
  },
  {
    path: '/new-product',
    name: 'AddProductComponent',
    component: ProductDetailsComponent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
