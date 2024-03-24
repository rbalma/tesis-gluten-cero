import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesAuth, routesPages, routesAdmin, routesPrivatePages, routesProfile } from './routes';
import { ScrollToTop } from './ScrollToTop';
import { Spinner } from '@/components/Loader/Spinner';
import LayoutHome from '../layout/home/LayoutHome';
import AdminScreen from '../layout/admin/LayoutAdmin';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import useAuthStore from '@/store/authStore';
import axiosInstance from '@/utils/axiosInstance';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { ProtectedAdminRoute } from './ProtectedAdminRoute';
import LayoutProfile from '../layout/home/LayoutProfile';

const AppRoutes = () => {
	const { checking, startChecking, finishChecking } = useAuthStore();

	useEffect(() => {
		let token = localStorage.getItem('token');

		const loadToken = (token) => {
			if (!token) return finishChecking();

			axiosInstance.defaults.headers.common['Authorization'] =
				'Bearer ' + token;
			startChecking();
		};

		loadToken(token);
	}, []);

	if (checking) {
		return (
			<div
				className='gx-d-flex gx-justify-content-center gx-align-items-center'
				style={{ height: '100vh' }}
			>
				<Spinner />
			</div>
		);
	}

	return (
		<BrowserRouter>
			<ScrollToTop>
	
				<Routes>
					{/* AUTH */}
					{routesAuth.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							element={
								<PublicRoute>
									<route.element />
								</PublicRoute>
							}
						/>
					))}

					{/* MAIN */}
					<Route path='/' element={<LayoutHome />}>
						{routesPages.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<route.element />}
							/>
						))}

						{routesPrivatePages.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<PrivateRoute>
										<route.element />
									</PrivateRoute>
								}
							/>
						))}

						<Route path='*' element={<NotFoundScreen />} />
					</Route>

					{/* PANEL PROFILE */}
					<Route path='perfil/:id' element={<LayoutProfile />}>
						{routesProfile.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<PrivateRoute>
										<route.element />
									</PrivateRoute>
								}
							/>
						))}
					</Route>

					{/* PANEL ADMIN */}
					<Route path='admin' element={<AdminScreen />}>
						{routesAdmin.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<ProtectedAdminRoute>
										<route.element />
									</ProtectedAdminRoute>
								}
							/>
						))}
					</Route>

					<Route path='*' element={<NotFoundScreen />} />
				</Routes>
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default AppRoutes;
