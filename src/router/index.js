import CategoriesDetails from '../components/Categiries/CategoriesDetails';
import CategoriesList from '../components/Categiries/CategoriesList';
import ProductDetails from '../components/Products/ProductDetails';
import ProductsList from '../components/Products/ProductsList';
import Categories from '../views/Categories';
import Products from '../views/Products';
import Home from '../views/Home';

export const routes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/products',
    component: Products,
    props: true,
    children: [
      {
        path: '',
        component: ProductsList,
        props: true,
        query: {
          page:1,
          limit:5,
          sortField:'title',
          sort:'asc',
          q: '',
        },
      },
      {
        path: ':id',
        component: ProductDetails,
        props: true,
      },
    ],
  },
  {
    path: '/categories',
    component: Categories,
    props: true,
    children:[
      {
        path: '',
        component: CategoriesList,
        props: true,
        query: {
          page:1,
          limit:5,
          sortField:'title',
          sort:'asc',
          q: '',
        },
      },
      {
        path: ':id',
        component: CategoriesDetails,
        props: true,
      },
    ],
  },

];
