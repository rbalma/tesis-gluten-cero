import Home from '@/pages/Home';
import LoginScreen from '@/pages/LoginScreen';

import AdminRecipe from '@/pages/Admin/AdminRecipe';
import AdminMap from '@/pages/Admin/AdminMap';

import Setting from '@/pages/Profile/Setting';
import RecipeProfile from '@/pages/Profile/RecipeProfile';


const routesPages = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/login',
    element: LoginScreen,
  },
  // {
  //   path: '/registro',
  //   element: About,
  // },
  // {
  //   path: '/forgot-password',
  //   element: About,
  // },
  // {
  //   path: '/reset-password/:resetToken',
  //   element: About,
  // },
];


const routesAdmin = [
  {
    path: 'recetas',
    element: AdminRecipe,
  },
  {
    path: 'mapa',
    element: AdminMap,
  },
];


const routesProfile = [
  {
    path: 'configuracion',
    element: Setting,
  },
  {
    path: 'recetas/:id',
    element: RecipeProfile,
  },
];


export {
  routesPages,
  routesAdmin,
  routesProfile,
};
