import { NavLink, useNavigate } from 'react-router-dom';

import styles from './MobileMenu.module.css';

export const MobileMenu = ({ open, closeMenu }) => {
	const navigate = useNavigate();

	const handleSelectItemMenu = () => {
		setTimeout(() => {
			closeMenu();
		}, 1000);
	};

	const handleSelectLogin = () => {
		setTimeout(() => {
			closeMenu();
			navigate('/login');
		}, 1000);
	};

	return (
		<div className={`${styles.container}  ${open && `${styles.openMenu}`}`}>
			<ul className={styles.menu}>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/noticias'
						className={styles.item}
						style={{ '--color': '#A5907E' }}
						data-text='&nbsp;Noticias&nbsp;'
					>
						&nbsp;Noticias&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/recetas'
						className={styles.item}
						style={{ '--color': '#9684A1' }}
						data-text='&nbsp;Recetas&nbsp;'
					>
						&nbsp;Recetas&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/mapa'
						className={styles.item}
						style={{ '--color': '#638475' }}
						data-text='&nbsp;Mapa&nbsp;'
					>
						&nbsp;Mapa&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/foro'
						className={styles.item}
						style={{ '--color': '#CE4760' }}
						data-text='&nbsp;Foro&nbsp;'
					>
						&nbsp;Foro&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/listado-productos'
						className={styles.item}
						style={{ '--color': '#B6C9BB' }}
						data-text='&nbsp;Productos&nbsp;'
					>
						&nbsp;Productos&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} onClick={handleSelectItemMenu}>
					<NavLink
						to='/aporte'
						className={styles.item}
						style={{ '--color': '#AAACB0' }}
						data-text='&nbsp;Aportar&nbsp;'
					>
						&nbsp;Aportar&nbsp;
					</NavLink>
				</li>
				<li className={styles.menuli} >
					<span
						className={styles.item}
						style={{ '--color': '#106EEA', cursor: 'pointer' }}
						data-text='&nbsp;Ingresar&nbsp;'
						onClick={handleSelectLogin}
					>
						&nbsp;Ingresar&nbsp;
					</span>
				</li>
			</ul>
		</div>
	);
};
