import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesAuth, routesPages, routesAdmin, routesProfile } from './routes';
import LayoutHome from '../layout/home/LayoutHome';
import AdminScreen from '../layout/admin/LayoutAdmin';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';


const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routesAuth.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.element />}
					/>
				))}

				<Route path='/' element={<LayoutHome />}>
					{routesPages.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.element />}
						/>
					))}
				<Route path='*' element={<NotFoundScreen />} />
				</Route>

				{/* PANEL ADMIN */}
				<Route path='admin' element={<AdminScreen />}>
					{routesAdmin.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.element />}
						/>
					))}
				</Route>

				{/* SACAR DE ACÁ
				<Route path='/perfil/:id' element={<ProfilePage />}>
					{routesProfile.map(route => (
						<Route
							key={route.path}
							path={route.path}
							element={<route.element />}
						/>
					))}
				</Route> */}

				<Route path='*' element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
