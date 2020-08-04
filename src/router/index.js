import ProductDetails from '../components/Products/ProductDetails';
import ProductsList from '../components/Products/ProductsList';

export const routes = [
  {
    path: '/products',
    component: ProductsList,
    children: [{
      path: 'new',
      name: 'ProductDetails',
      component: ProductDetails,
    }],
  },
  // {
  //   // path: '/products/new',
  //   // name: 'ProductDetails',
  //   // component: ProductDetails,
  // },
];
