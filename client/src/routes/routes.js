import HomePage from '@/pages/Home/HomePage';
import { Login, SignUp, ForgotPassword, ResetPassword } from '@/pages/Auth';

import {
	AdminRecipe,
	AdminRecipeCategories,
	AdminMap,
	AdminNotice,
	AdminProducts,
	AdminStatistics,
	AdminForo,
	AdminUser,
} from '@/pages/Admin';

import {
	ProfileSettingPage,
	ProfileNotificationsPage,
	ProfileRecipesCreatedPage,
	ProfileRecipesFavPage,
	ProfileRecipesReviewPage,
	ProfileMarkersCreatedPage,
	ProfileMarkersFavPage,
	ProfileMarkersReviewPage,
	ProfileTheardsCreatedPage,
	ProfileTheardsFavPage,
	ProfilePostsCreatedPage,
} from '@/pages/Profile';

import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import { ProductsPage } from '@/pages/Products/ProductsPage';
import { RecipeDetailPage, RecipeFormPage, RecipeSearchPage } from '@/pages/Recipes';
import { MapFormPage, MapSearchPage } from '@/pages/Map';
import { PostsList, ThreadForm, ThreadsList } from '@/pages/Forum';
import Aportes from '@/pages/Aportes/Aportes';

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
		path: '/recetas',
		element: RecipeSearchPage,
	},
	{
		path: '/recetas/:recetaId',
		element: RecipeDetailPage,
	},
	{
		path: '/mapa',
		element: MapSearchPage,
	},
	{
		path: '/foro',
		element: ThreadsList,
	},
	{
		path: '/aporte',
		element: Aportes,
	},
	{
		path: '/aporte/:status',
		element: Aportes,
	},
	{
		path: '/foro-formulario',
		element: ThreadForm,
	},
	{
		path: '/foro/:hiloId',
		element: PostsList,
	},
	{
		path: '/productos',
		element: ProductsPage,
	},
];

const routesPrivatePages = [
	{
		path: '/receta-formulario',
		element: RecipeFormPage,
	},
	{
		path: '/mapa-formulario',
		element: MapFormPage,
	},
	{
		path: '/foro-formulario',
		element: ThreadForm,
	},
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
		element: AdminForo,
	},
	{
		path: 'productos',
		element: AdminProducts,
	},
];

const routesProfile = [
	{
		path: '',
		element: ProfileSettingPage,
	},
	{
		path: 'notificaciones',
		element: ProfileNotificationsPage,
	},
	{
		path: 'recetas',
		element: ProfileRecipesCreatedPage,
	},
	{
		path: 'recetas/favoritas',
		element: ProfileRecipesFavPage,
	},
	{
		path: 'recetas/calificadas',
		element: ProfileRecipesReviewPage,
	},
	{
		path: 'marcadores',
		element: ProfileMarkersCreatedPage,
	},
	{
		path: 'marcadores/favoritos',
		element: ProfileMarkersFavPage,
	},
	{
		path: 'marcadores/calificados',
		element: ProfileMarkersReviewPage,
	},
	{
		path: 'foro',
		element: ProfileTheardsCreatedPage,
	},
	{
		path: 'foro/favoritos',
		element: ProfileTheardsFavPage,
	},
	{
		path: 'posteos',
		element: ProfilePostsCreatedPage,
	},
	{
		path: '*',
		element: NotFoundScreen,
	},
];

export {
	routesAuth,
	routesPages,
	routesPrivatePages,
	routesAdmin,
	routesProfile,
};
