import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routesAuth, routesPages, routesAdmin } from './routes';
import { ScrollToTop } from './ScrollToTop';
import { Spinner } from '@/components/Loader/Spinner';
import LayoutHome from '../layout/home/LayoutHome';
import AdminScreen from '../layout/admin/LayoutAdmin';
import NotFoundScreen from '@/pages/NotFound/NotFoundScreen';
import useAuthStore from '@/store/authStore';
import axiosInstance from '@/utils/axiosInstance';

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
			<ScrollToTop >
			<Routes>
				{routesAuth.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={<route.element />}
					/>
				))}

				<Route path='/' element={<LayoutHome />}>
					{routesPages.map((route) => (
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
					{routesAdmin.map((route) => (
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
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default AppRoutes;
