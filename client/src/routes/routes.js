import Home from '@/pages/Home';
import { Login, SignUp, ForgotPassword, ResetPassword } from '@/pages/Auth';

import AdminRecipe from '@/pages/Admin/AdminRecipe';
import AdminMap from '@/pages/Admin/AdminMap';

import Setting from '@/pages/Profile/Setting';
import RecipeProfile from '@/pages/Profile/RecipeProfile';

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
		element: Home,
	},
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

export { routesAuth, routesPages, routesAdmin, routesProfile };
