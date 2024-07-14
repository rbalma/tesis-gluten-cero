import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logoBlanco.png';
import { MobileMenu } from './MobileMenu';
import { UserProfile } from './UserProfile';
import useAuthStore from '@/store/authStore';
import { NotificationMenu } from './NotificationMenu';

import './NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();
	const user = useAuthStore((state) => state.userProfile);
	const [openMenu, setOpenMenu] = useState(false);

	const handleChangeMenu = () => {
		setOpenMenu((open) => !open);
	};

	const scrollToNoticias = (event) => {
		event.preventDefault(); // Evitar que el enlace realice la navegación

		const noticiasElement = document.getElementById('noticias');
		if (noticiasElement) {
			noticiasElement.scrollIntoView({ behavior: 'smooth' });
		}
    };

	return (
		<>
			<nav className='main__navbar' id='main__navbar'>
				<div className='logo__navbar'>
					<NavLink to='/'>
						<img src={Logo} alt='logo_gluten-cero' width={100} />
					</NavLink>
				</div>

				<ul className='menu__navbar'>
					<li>
						<NavLink
							to='/#noticias'
							className={() =>
								'item__navbar' +
								(window.location.hash === '#noticias'
									? 'item__navbar-selected'
									: '')
							}>
							Noticias
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/recetas'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}>
							Recetas
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/mapa'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}>
							Mapa
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/foro'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}>
							Foro
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/productos'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}>
							Productos
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/#contacto'
							className={({ isActive }) =>
								'item__navbar' + (window.location.hash === '#contacto' ? 'item__navbar-selected' : '')
							}>
							Contacto
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/aporte'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}>
							Aportar
						</NavLink>
					</li>
				</ul>

				{user ? (
					<div className='icon-profile__navbar'>
						<NotificationMenu />
						<UserProfile />
					</div>
				) : (
					<div className='login__navbar'>
						<button
							className='button-login__navbar'
							onClick={() => navigate('/ingreso')}>
							Iniciar Sesión
						</button>
					</div>
				)}

				{/* Menu Mobile */}

				<div className='icon-menu__navbar'>
					<input
						className='checkbox'
						type='checkbox'
						checked={openMenu}
						name=''
						id=''
						onChange={handleChangeMenu}
					/>
					<div className='hamburger-lines'>
						<span className='line line1'></span>
						<span className='line line2'></span>
						<span className='line line3'></span>
					</div>
				</div>
			</nav>

			<div className='menu-mobile__navbar'>
				<MobileMenu
					open={openMenu}
					closeMenu={handleChangeMenu}
					history={history}
				/>
			</div>
		</>
	);
};

export default NavBar;