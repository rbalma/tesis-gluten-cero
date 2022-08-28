import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '@/assets/images/logoBlanco.png';
import { MobileMenu } from './MobileMenu';
import { UserProfile } from './UserProfile';
import useAuthStore from '@/store/authStore';

import './NavBar.css';

const NavBar = () => {
	const navigate = useNavigate();
	const { userProfile: user, removeUser } = useAuthStore();
	const [openMenu, setOpenMenu] = useState(false);

	const handleChangeMenu = () => {
		setOpenMenu((open) => !open);
	};

	return (
		<>
			<nav className='main__navbar'>
				<div className='logo__navbar'>
					<Link to='/'>
						<img src={Logo} alt='logo_gluten-cero' width={100} />
					</Link>
				</div>

				<ul className='menu__navbar'>
					<li>
						<NavLink
							to='/noticias'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Noticias
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/recetas'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Recetas
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/mapa'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Mapa
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/foro'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Foro
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/listado-productos'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Productos
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/contacto'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Contacto
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/aporte'
							className={({ isActive }) =>
								'item__navbar' + (isActive ? 'item__navbar-selected' : '')
							}
						>
							Aportar
						</NavLink>
					</li>
				</ul>

				{user ? (
					<div className='icon-profile__navbar'>
						<UserProfile />
					</div>
				) : (
					<div className='login__navbar'>
						<button
							className='button-login__navbar'
							onClick={() => navigate('/ingreso')}
						>
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
