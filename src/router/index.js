import ProductDetails from '../components/Products/ProductDetails';
import ProductsList from '../components/Products/ProductsList';
import Products from '../views/Products';
import Home from '../views/Home';

export const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/products',
    component: Products,
    children: [
      {
        path: '',
        component: ProductsList,
      },
      {
        path: ':id',
        component: ProductDetails,
        props: true,
      },
    ],
  },
  // {
  //   // path: '/products/new',
  //   // name: 'ProductDetails',
  //   // component: ProductDetails,
  // },
];
