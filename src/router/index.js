import ProductDetails from '../components/Products/ProductDetails';
import ProductsList from '../components/Products/ProductsList';
import Products from '../views/Products';
import Home from '../views/Home';
import PageDeclaratorComponent from '../components/PageDeclaratorComponent';

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
        query: {
          page:1,
          limit:5,
          sortField:'title',
          sort:'aesc',
        },
      },
      {
        path: ':id',
        component: ProductDetails,
        props: true,
      },
      {
        path:'test',
        component: PageDeclaratorComponent,
        props: true,
      }
    ],
  },
  // {
  //   // path: '/products/new',
  //   // name: 'ProductDetails',
  //   // component: ProductDetails,
  // },
];
