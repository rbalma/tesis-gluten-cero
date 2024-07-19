import HomePage from '@/pages/Home/HomePage';
import { Login, SignUp, ForgotPassword, ResetPassword, ActiveAccount } from '@/pages/Auth';

import {
	AdminStatistics,
	UsersAdminPage,
	RecipesAdminPage,
	MapAdminPage,
	ThreadsAdminPage,
	NoticesAdminPage,
	CategoriesAdminPage,
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
	ProfileProductsFavPage,
} from '@/pages/Profile';

import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import { ProductsPage } from '@/pages/Products/ProductsPage';
import { RecipeDetailPage, RecipeFormPage, RecipeSearchPage } from '@/pages/Recipes';
import { MapFormPage, MapSearchPage } from '@/pages/Map';
import { PostsList, ThreadForm, ThreadsList } from '@/pages/Forum';
import Aportes from '@/pages/Aportes/Aportes';
import { ThreadEditForm } from '@/pages/Forum/Form/ThreadEditForm';

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
	{
		path: '/activar-cuenta/:id',
		element: ActiveAccount,
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
		path: '/foro-formulario-edit/:hiloId',
		element: ThreadEditForm,
	},
	{
		path: '/foro/:hiloId',
		element: PostsList,
	},
	{
		path: '/aporte',
		element: Aportes
	},
	{
		path: '/aporte/:status',
		element: Aportes
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
		path: '/receta-formulario/:recetaId',
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
		path: '',
		element: AdminStatistics,
	},
	{
		path: 'estadisticas',
		element: AdminStatistics,
	},
	{
		path: 'usuarios',
		element: UsersAdminPage,
	},
	{
		path: 'recetas',
		element: RecipesAdminPage,
	},
	{
		path: 'categorias',
		element: CategoriesAdminPage,
	},
	{
		path: 'noticias',
		element: NoticesAdminPage,
	},
	{
		path: 'mapa',
		element: MapAdminPage,
	},
	{
		path: 'foro',
		element: ThreadsAdminPage,
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
		path: 'productos',
		element: ProfileProductsFavPage,
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
