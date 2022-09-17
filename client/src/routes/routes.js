import HomePage from '@/pages/Home/HomePage';
import { Login, SignUp, ForgotPassword, ResetPassword } from '@/pages/Auth';

import {AdminRecipe, AdminRecipeCategories, AdminMap, AdminNotice, AdminProducts, AdminStatistics, AdminForo, AdminUser } from '@/pages/Admin';

import ProfilePanel from '@/pages/Profile/Panel/ProfilePanel';
import { ProfileMap, ProfileTheards, ProfileRecipes, ProfileSetting } from '@/pages/Profile/Panel/items';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import { ProfilePage } from '@/pages/Profile/ProfilePage';
import { ProductsPage } from '@/pages/Products/ProductsPage';

const routesAuth = [
	{
		path: '/ingreso',
		element: Login,
	},
	{
		path: '/registro',
		element: SignUp,
	},
	{
		path: '/password-perdida',
		element: ForgotPassword,
	},
	{
		path: '/cambiar-password/:resetToken',
		element: ResetPassword,
	},
];

const routesPages = [
	{
		path: '/',
		element: HomePage,
	},
	{
		path: '/listado-productos',
		element: ProductsPage,
	},
	{
		path: '/perfil/:id',
		element: ProfilePage
	},
	{
		path: '/perfil/:id/panel/*',
		element: ProfilePanel
	}
];

const routesAdmin = [
	{
		path: 'estadisticas',
		element: AdminStatistics,
	},
	{
		path: 'usuarios',
		element: AdminUser,
	},
	{
		path: 'recetas',
		element: AdminRecipe,
	},
	{
		path: 'recetas-categorias',
		element: AdminRecipeCategories,
	},
	{
		path: 'noticias',
		element: AdminNotice,
	},
	{
		path: 'mapa',
		element: AdminMap,
	},
	{
		path: 'foro',
		element: AdminForo
	},
	{
		path: 'productos',
		element: AdminProducts
	},
];

const routesProfile = [
	{
		path: 'configuracion',
		element: ProfileSetting,
	},
	{
		path: 'recetas',
		element: ProfileRecipes,
	},
	{
		path: 'mapa',
		element: ProfileMap,
	},
	{
		path: 'foro',
		element: ProfileTheards,
	},
	{
		path: '*',
		element: NotFoundScreen,
	},
];

export { routesAuth, routesPages, routesAdmin, routesProfile };
